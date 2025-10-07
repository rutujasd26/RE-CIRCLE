// routes/products.js
const express = require('express'); 
const { getAllProducts, createProduct } = require('../controllers/productController'); // Check the path
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Append the file extension
    },
});

const upload = multer({ storage: storage });

router.get('/', getAllProducts); // Make sure this handler is defined
router.post('/', upload.single('image'), createProduct); // Accepts image uploads

module.exports = router;
