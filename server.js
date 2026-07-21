require('dotenv').config(); // 👈 ALWAYS MUST BE LINE 1!

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Database connected securely! 💾'))
  .catch((err) => console.error('Database connection error ❌:', err));

// Routes
app.use('/api/transactions', require('./routes/transactions'));

// Test Route
app.get('/', (req, res) => {
  res.send('FinAI1 Backend Server is running smoothly! 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running perfectly on port ${PORT}`);
});