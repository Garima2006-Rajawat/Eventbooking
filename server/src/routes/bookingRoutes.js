const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { validateBooking } = require('../middlewares/validation');
const { bookingLimiter } = require('../middlewares/rateLimiter');

router.post('/', bookingLimiter, validateBooking, bookingController.createBooking);
router.get('/', bookingController.getBookings); // Admin

module.exports = router;