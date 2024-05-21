const mongoose = require('mongoose');
const boatSchema = require('../schema/boat'); // Adjust the path as necessary

const BoatModel = mongoose.model('Boat', boatSchema);

module.exports = BoatModel;
