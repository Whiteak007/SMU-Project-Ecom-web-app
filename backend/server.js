import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db_connect.js';
import connectCloudinary from './config/cloudinary_connect.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import profileRouter from './routes/profileRoute.js';
// App config 
const app = express();
const port = process.env.PORT || 4000

// Database Connectivity 
connectDB();
connectCloudinary();

// Middlewares 
app.use(express.json());
app.use(cors());

// api endpoints 
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Add this with your other route imports
app.use('/api/profile', profileRouter);

app.get('/', (req, res) => {
    res.send("Hello! from Backend Server")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
})