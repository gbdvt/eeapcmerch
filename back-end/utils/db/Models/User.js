const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        minlength: 3,
        required: true
    },
    email: {
        type: String,
        unique: true,
        minlength: 5,
        required: true
    },
    password: {
        type: String,
        minlength: 3,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {type: Boolean, default: false},
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('User', userSchema)

module.exports = User