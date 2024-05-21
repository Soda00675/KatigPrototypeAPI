const mongoose = require('mongoose');
const { Schema } = mongoose;

const boatSchema = new Schema({
  boatId: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(), // Generates a new unique boatId automatically
    unique: true, // Ensures boatId is unique
    index: true // Adds an index to the boatId field
  },
  boatType: {
    type: String,
    enum: ['liner', 'passenger'], // Only allows these two values
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  owner: {
    type: String,
    required: true
  }
});

module.exports = boatSchema;
