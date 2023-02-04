const mongoose = require("mongoose")

const memberSchema = new mongoose.Schema({
    _idUser: {
        type: String,
        require: true
    },
    _idFolder: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        require: true
    },
    isSeenNoti: {
        type: Boolean,
        require: true
    }
}, {timestamps: true})
module.exports = mongoose.model("member", memberSchema)