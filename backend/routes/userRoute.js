import express from 'express';
import { loginUser, registerUser, adminLogin} from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js'; // Make sure you have this middleware

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

export default userRouter;