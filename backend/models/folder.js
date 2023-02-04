const mongoose = require("mongoose")

const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 50
    },
    _idUser: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 100,
    },
    icon: {
        type: String,
        require: true,
    },
    color: {
        type: String,
        require: true,
    }
}, {timestamps: true})

module.exports = mongoose.model("folder", folderSchema)