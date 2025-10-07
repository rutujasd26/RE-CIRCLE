const Rental = require('../models/Rental');  
const User = require('../models/User'); 
const Product = require('../models/Product'); 

exports.createRental = async (req, res) => {
    const { username, product_name, start_date, end_date } = req.body; // Get fields from request

    try {
        // Check if required fields are missing
        if (!username || !product_name || !start_date || !end_date) {
            return res.status(400).json({ message: 'All fields (username, product_name, start_date, end_date) are required' });
        }

        // Check if the user exists in the database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the product exists and is available
        const product = await Product.findOne({ name: product_name });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (!product.availability) {
            return res.status(400).json({ message: 'Product is not available for rent' });
        }

        // Create a new rental record
        const rental = await Rental.create({
            username,
            product_name,
            start_date,
            end_date
        });

        res.status(201).json(rental);
    } catch (error) {
        console.error('Error in rental creation:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
