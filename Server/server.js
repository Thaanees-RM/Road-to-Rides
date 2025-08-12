import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import formRoutes from './routes/formRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// Root route to fix "Cannot GET /"
app.get('/', (req, res) => {
  res.send('API is running');
});

// Add your other routes here
app.use('/api', formRoutes);

// DB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Listen on all interfaces (0.0.0.0) to allow external access
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
  })
  .catch((err) => console.error(err));
