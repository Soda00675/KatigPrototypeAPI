const mongoose = require('mongoose');
const emergencyContactSchema = require('../schema/emergencyContact'); // Correct relative path

const EmergencyContactModel = mongoose.model('EmergencyContact', emergencyContactSchema);

module.exports = EmergencyContactModel;
