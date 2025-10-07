const express = require('express'); 
const { createRental } = require('../controllers/rentalController');
const router = express.Router();

router.post('/', createRental);

module.exports = router;
