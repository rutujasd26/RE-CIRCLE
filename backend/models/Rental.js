const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Rental', rentalSchema);
