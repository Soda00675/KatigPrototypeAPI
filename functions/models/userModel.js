const mongoose = require('mongoose');
const userSchema = require('../schema/user');

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
