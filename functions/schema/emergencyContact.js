const mongoose = require('mongoose');
const { Schema } = mongoose;

const emergencyContactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^09\d{9}$/.test(v);
      },
      message: props => `${props.value} is not a valid contact number! Must start with 09 and be 11 digits long.`
    }
  },
  available: {
    type: Boolean,
    default: true
  }
});

module.exports = emergencyContactSchema;
