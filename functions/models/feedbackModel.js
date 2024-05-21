const mongoose = require('mongoose');
const feedbackSchema = require('../schema/feedback'); // Adjust the path as necessary

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
