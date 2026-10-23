import express from 'express';
import { getUserProfile, updateUserProfile, updateProfileImage } from '../controllers/profileController.js';
import authMiddleware from '../middleware/auth.js';
import upload from '../middleware/multer.js'; // Assuming multer.js is in middleware folder

const profileRouter = express.Router();

profileRouter.get('/', authMiddleware, getUserProfile);
profileRouter.put('/', authMiddleware, updateUserProfile);
profileRouter.put('/image', authMiddleware, upload.single('profileImage'), updateProfileImage); // New route for image upload

export default profileRouter;