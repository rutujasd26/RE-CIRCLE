// server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); // Authentication routes
const productRoutes = require('./routes/products'); // Product routes
const rentalRoutes = require('./routes/rentals'); // Rental routes
const dotenv = require('dotenv');
const path = require('path');

dotenv.config(); // Load environment variables
const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse incoming JSON requests

// Route handling
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/products', productRoutes); // Product routes
app.use('/api/rentals', rentalRoutes); // Rental routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
