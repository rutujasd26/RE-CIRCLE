// controllers/productController.js
const Product = require('../models/Product'); // Adjust the path as necessary

// Handler to get all products with optional category filtering
exports.getAllProducts = async (req, res) => {
    try {
        const { category } = req.query; // Extract category from query params
        const filter = category ? { category } : {}; // Create a filter object

        const products = await Product.find(filter); // Apply the filter
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve products.' });
    }
};

// Handler to create a new product
exports.createProduct = async (req, res) => {
    try {
        const productData = {
            name: req.body.name,
            category: req.body.category,
            price_per_day: req.body.price_per_day,
            description: req.body.description,
            image: req.file.path, // Use the file path provided by multer
        };

        const newProduct = new Product(productData);
        await newProduct.save();

        res.status(201).json({ message: 'Product created successfully!', product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the product.' });
    }
};
