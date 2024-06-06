const mongoose = require('mongoose');
const emergencyContactSchema = require('../schema/emergencyContact'); // Adjust the path as necessary

const EmergencyContactModel = mongoose.model('EmergencyContact', emergencyContactSchema);

module.exports = EmergencyContactModel;
