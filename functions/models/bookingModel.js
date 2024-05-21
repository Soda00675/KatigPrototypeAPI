const mongoose = require('mongoose');
const bookingSchema = require('../schema/booking'); // Adjust the path as necessary

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;
