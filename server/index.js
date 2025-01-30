import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import managerRoutes from './routes/manager.routes.js'
import clientRoutes from './routes/client.routes.js'
import taskRoutes from './routes/task.routes.js'
import generateRoutes from './routes/ai.route.js'
import requestRoutes from './routes/request.route.js'

dotenv.config();

const app = express();


mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

app.listen(3000, () => console.log('Server running on port 3000'));
app.use(cors({
    origin: 'http://localhost:5173',  // Explicitly allow only this origin
    credentials: true,                // Allow credentials (cookies, authentication headers, etc.)
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/manager',managerRoutes)
app.use('/api/client',clientRoutes)
app.use('/api/manager',managerRoutes)
app.use('/api/task',taskRoutes)
app.use('/api/generate', generateRoutes);
app.use('/api/request', requestRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});