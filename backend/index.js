import express from 'express';
import connectToMongoDb from './connectToMongoDb.js';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js'
import cookieParser from 'cookie-parser';


const app = express();

app.use(express.json());
app.use(cookieParser());

dotenv.config();

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// creating a global error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  res.status(statusCode).json({
    succes: false,
    statusCode,
    message,
});
})



const PORT = 8000;


// starting the server 
app.listen(PORT, () => {
  connectToMongoDb();
    console.log(`Server running on ${PORT}`);
})
