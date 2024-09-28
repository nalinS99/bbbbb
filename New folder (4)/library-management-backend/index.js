const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes'); // Add this line for book routes
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes); // Add this line to handle book routes

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
