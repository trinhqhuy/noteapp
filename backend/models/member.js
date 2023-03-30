const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    _idUser: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    _idFolder: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
    },
    isIntive: {
      type: Boolean,
      require: true,
    },
    isActive: {
      type: Boolean,
      require: true,
    },
    isSeenNoti: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("member", memberSchema);
