const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 7,
        unique: true
    },
    email: {
        type: String,
        require: true,
        maxlength: 20,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: Number,
        require: true,
        integer: true,
    }
}, {timestamps: true})
module.exports = mongoose.model("user", userSchema)