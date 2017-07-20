const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    fullname: String,
    email: String,
    username: String,
    password: String,
    address: String
}, { timestamps: true });

var User = mongoose.model('User', UserSchema);

module.exports = User;