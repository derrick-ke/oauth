const mongoose = require('mongoose')
var validator = require('validator');


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter a valid email address'],
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 8
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password']
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User