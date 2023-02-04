const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    _idFolder: {
      type: String,
      require: true,
      minlength: 2,
      maxlength: 100,
    },
    _idUser: {
      type: String,
      require: true,
      minlength: 2,
      maxlength: 100,
    },
    title: {
      type: String,
      require: true,
      minlength: 2,
      maxlength: 200,
    },
    content: {
      type: String,
      require: true,
      minlength: 5,
    },
    pin: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("note", noteSchema);
