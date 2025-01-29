import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import managerRoutes from './routes/manager.routes.js'

dotenv.config();

const app = express();


// Get the directory name using import.meta.url
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

app.listen(3000, () => console.log('Server running on port 3000'));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/manager',managerRoutes)

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});