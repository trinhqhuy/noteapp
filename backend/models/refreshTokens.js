const mongoose = require('mongoose')

const refreshTokens = new mongoose.Schema({
    token: {
        type: String,
        require: true,

    }
}, {timestamps: true})
module.exports = mongoose.model("refreshTokens", refreshTokens)