const User = require("../models/user");

const userController = {
  updateInfoUser: async (req, res) => {
    try {
      if (!req.body.password) {
        const user = await User.findOneAndUpdate(
          {
            _id: req.body.id,
          },
          {
            username: req.body.username,
            email: req.body.email,
            avatar: req.body.avatar,
          },
          { new: true }
        );
        if (!user) return res.status(404).json("User not found!");
      } else {
        const sault = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, sault); //khuc nay giong nhu ma hoa md5 ben php
        const user = await User.findOneAndUpdate(
          {
            _id: req.body.id,
          },
          {
            username: req.body.username,
            password: hashed,
            email: req.body.email,
            avatar: req.body.avatar,
          },
          { new: true }
        );
        if (!user) return res.status(404).json("User not found!");
      }

      return res.status(200).json("Update is successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
module.exports = userController;
