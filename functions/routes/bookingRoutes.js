const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');  // Ensure the path is correct and matches your directory structure
const authenticateToken = require('../middleware/authenticateToken'); // Adjust path as needed

// Middleware to get booking by ID
async function getBooking(req, res, next) {
  let booking;
  try {
    booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.booking = booking;
  next();
}

// Create a new booking
router.post('/booking', authenticateToken, async (req, res) => {
  const { dateTime, destination, passengerType } = req.body;
  try {
    const booking = new Booking({
      userId: req.user.userId, // Use the authenticated user's ID
      dateTime,
      destination,
      passengerType
    });
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Get all bookings
router.get('/booking', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Get a specific booking
router.get('/booking/:id', getBooking, (req, res) => {
  res.json(res.booking);
});

// Update a booking
router.patch('/booking/:id', getBooking, async (req, res) => {
  if (req.body.dateTime != null) {
    res.booking.dateTime = req.body.dateTime;
  }
  if (req.body.destination != null) {
    res.booking.destination = req.body.destination;
  }
  if (req.body.passengerType != null) {
    res.booking.passengerType = req.body.passengerType;
  }
  try {
    const updatedBooking = await res.booking.save();
    res.json(updatedBooking);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Delete a booking
router.delete('/booking/:id', getBooking, async (req, res) => {
  try {
    await res.booking.remove();
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
