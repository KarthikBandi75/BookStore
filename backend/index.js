import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
const app = express();

app.use(cors()); // This will allow all origins

// Or if you want to limit it to your React frontend:
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your React app URL if needed
}));



// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the MERN Stack Tutorial');
});

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
