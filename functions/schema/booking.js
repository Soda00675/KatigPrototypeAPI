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
    default: () => new mongoose.Types.ObjectId().toString(),
    unique: true,
    index: true
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

module.exports = bookingSchema; // Ensure the schema is exported properly
