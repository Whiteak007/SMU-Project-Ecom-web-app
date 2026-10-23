import React, { useContext, useState, useEffect, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiLock, FiSave, FiX, FiCamera } from 'react-icons/fi';
import Title from '../components/Title';

const MyProfile = () => {
    // Accessing context variables for token, backend URL, and navigation
    const { token, backendUrl, navigate } = useContext(ShopContext);

    // State to manage loading indicators for different actions
    const [isLoading, setIsLoading] = useState(false); // For general form submission
    const [isLoadingProfile, setIsLoadingProfile] = useState(true); // For initial profile data fetch
    const [isUploadingImage, setIsUploadingImage] = useState(false); // For image upload action

    // State for user data fetched from the backend
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        profileImage: '' // Stores the URL of the profile image
    });

    // State for form data, including user info and passwords
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // State to hold the newly selected image file
    const [selectedImage, setSelectedImage] = useState(null);
    // State to manage the image preview URL
    const [imagePreview, setImagePreview] = useState('');
    
    // Ref to programmatically click the hidden file input
    const fileInputRef = useRef(null);

    // Effect hook to fetch user profile data when the component mounts or token changes
    useEffect(() => {
        // Redirect to login if no token is found
        if (!token) {
            navigate('/login');
            return;
        }
        fetchUserProfile();
    }, [token, navigate]);

    // Function to fetch the user's current profile data from the backend
    const fetchUserProfile = async () => {
        try {
            setIsLoadingProfile(true);
            const response = await axios.get(backendUrl + '/api/profile', {
                headers: { token }
            });
            
            if (response.data.success) {
                const { name, email, image } = response.data.user; // Corrected: use 'image' field
                setUserData({ name, email, profileImage: image }); // Corrected: store as 'profileImage'
                setFormData(prev => ({ ...prev, name, email }));
                setImagePreview(image || generateDefaultAvatar(name)); // Use profile image or a default avatar
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            toast.error('Failed to fetch profile data');
        } finally {
            setIsLoadingProfile(false);
        }
    };

    // Handler for when a new image is selected
    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type and size
            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error('Image size should be less than 5MB');
                return;
            }
            
            setSelectedImage(file);
            
            // Create and set an immediate preview of the selected image
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handler for submitting the image upload
    const handleImageUpload = async () => {
        if (!selectedImage) {
            toast.error('Please select an image first');
            return;
        }

        setIsUploadingImage(true);
        try {
            const data = new FormData();
            data.append('profileImage', selectedImage);

            // This is the key part: send the file to your backend endpoint
            const response = await axios.put(backendUrl + '/api/profile/image', data, {
                headers: {
                    'token': token,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success('Profile image updated successfully!');
                // Update the user data and image preview with the new URL
                setUserData(prev => ({ ...prev, profileImage: response.data.imageUrl }));
                setImagePreview(response.data.imageUrl);
                setSelectedImage(null); // Reset selected image after successful upload
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            const errorMessage = error.response?.data?.message || 'Failed to upload image';
            toast.error(errorMessage);
        } finally {
            setIsUploadingImage(false);
        }
    };

    // Handler for changes in the text input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handler for the main profile update form submission (name, email, password)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.put(backendUrl + '/api/profile', formData, {
                headers: { token }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setUserData(response.data.user);
                // Reset password fields after successful update
                setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            const errorMessage = error.response?.data?.message || 'Failed to update profile';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Handler to cancel and reset the form to its original state
    const handleCancel = () => {
        setFormData({
            name: userData.name,
            email: userData.email,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setSelectedImage(null);
        setImagePreview(userData.profileImage || generateDefaultAvatar(userData.name));
    };

    // Function to generate a default avatar from the user's name
    const generateDefaultAvatar = (name) => {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=200&rounded=true&bold=true`;
    };

    // Show a loading spinner while fetching initial profile data
    if (isLoadingProfile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-2xl mx-auto">
                <div className="mb-10 text-center">
                    <Title text1={'MY'} text2={'PROFILE'} />
                    <p className="mt-2 text-gray-600">Manage your account information</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                    {/* Profile Image Section */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative group w-32 h-32">
                            <img
                                src={imagePreview}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                                onError={(e) => e.target.src = generateDefaultAvatar(userData.name)} // Fallback for broken image URL
                            />
                            {/* Hidden file input that's triggered by the visible elements */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageSelect}
                                accept="image/*"
                                className="hidden"
                            />
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer"
                            >
                                <FiCamera className="text-white text-2xl" />
                            </div>
                        </div>
                        
                        {/* Image action buttons, conditionally rendered */}
                        {selectedImage && (
                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={handleImageUpload}
                                    disabled={isUploadingImage}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                                >
                                    {isUploadingImage ? 'Uploading...' : 'Upload Image'}
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedImage(null);
                                        setImagePreview(userData.profileImage || generateDefaultAvatar(userData.name));
                                    }}
                                    disabled={isUploadingImage}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                        
                        <p className="mt-2 text-sm text-gray-500 text-center">
                            Click the image to change it.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                                placeholder="Full Name"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                                placeholder="Email Address"
                            />
                        </div>

                        {/* Password Change Section */}
                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                            <p className="text-sm text-gray-500 mb-4">Leave these fields blank if you don't want to change your password.</p>

                            {/* Current Password */}
                            <div className="relative mb-4">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                                    placeholder="Current Password"
                                    autoComplete="current-password"
                                />
                            </div>

                            {/* New Password */}
                            <div className="relative mb-4">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                                    placeholder="New Password"
                                    autoComplete="new-password"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                                    placeholder="Confirm New Password"
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isLoading}
                                className="flex-1 flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50"
                            >
                                <FiX className="mr-2" />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <FiSave className="mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;