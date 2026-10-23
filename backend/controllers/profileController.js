import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import validator from 'validator';
import {v2 as cloudinary } from 'cloudinary';
// Function to get a user's profile, now including the image
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // Include 'image' in the selection
    const user = await userModel.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ 
      success: true, 
      user: {
        name: user.name,
        email: user.email,
        image: user.image // Add the image URL
      }
    });
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    console.log('Updating user profile for userId:', req.user.userId);
    
    const userId = req.user.userId;
    const { name, email, currentPassword, newPassword, confirmPassword } = req.body;
    
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    // Check if email is being changed and validate it
    if (email && email !== user.email) {
      if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Please enter a valid email" });
      }
      
      // Check if new email already exists
      const emailExists = await userModel.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ success: false, message: "Email already in use" });
      }
      
      user.email = email;
    }
    
    // Update name if provided
    if (name) {
      user.name = name;
    }
    
    // Handle password change if requested
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ success: false, message: "Current password is required to set a new password" });
      }
      
      // Verify current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Current password is incorrect" });
      }
      
      // Validate new password
      if (newPassword.length < 8) {
        return res.status(400).json({ success: false, message: "New password must be at least 8 characters long" });
      }
      
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ success: false, message: "New password and confirmation do not match" });
      }
      
      // Hash and set new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }
    
    await user.save();
    
    // Return updated user data (excluding password)
    const updatedUser = await userModel.findById(userId).select('-password');
    
    res.status(200).json({ 
      success: true, 
      message: "Profile updated successfully",
      user: {
        name: updatedUser.name,
        email: updatedUser.email
      }
    });
    
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// New function to handle profile image uploads
const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file provided" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `user_profiles/${userId}` // Optional: Organize images by user
    });

    // Update the user's image field with the new URL
    user.image = result.secure_url;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      imageUrl: user.image
    });

  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getUserProfile, updateUserProfile, updateProfileImage };