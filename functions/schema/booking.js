const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookingId: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(), // Generates a new unique bookingId automatically
    unique: true, // Ensures bookingId is unique
    index: true // Adds an index to the bookingId field
  },
  dateTime: {
    type: Date,
    required: true
  },
  destination: {
    type: String,
    enum: ['buyabod-maniwaya', 'buyabod-mongpong', 'buyabod-polo', 'maniwaya-buyabod', 'mongpong-buyabod', 'polo-buyabod'],
    required: true
  },
  passengerType: {
    type: String,
    enum: ['student', 'senior', 'adult', 'PWD'],
    required: true
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
ZZ