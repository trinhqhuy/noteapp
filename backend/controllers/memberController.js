const mongoose = require("mongoose");
const middlewareController = require("../controllers/middlewareController");
const Member = require("../models/member");
const User = require("../models/user");
const Folder = require("../models/folder");
const Note = require("../models/note");
const { ObjectId } = require("bson");
const memberController = {
  searchMemberFolder: async (req, res) => {
    try {
      const member = await User.findOne({ username: req.body.name });
      if (!member) {
        return res.status(400).json("Cant find this user!");
      }
      const isIntive = await Member.findOne({
        _idUser: member._id,
        _idFolder: req.body._idFolder,
      });
      const { password, ...others } = member._doc;
      if (!isIntive) {
        return res.status(200).json({ ...others });
      }
      return res.status(200).json({ ...others, intive: isIntive });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // addMember: async (req, res) => {
  //   try {
  //     const newMember = await Member({
  //       _idUser: req.body._idUser,
  //       _idGroup: req.body._idGroup,
  //     });
  //     const member = await newMember.save();
  //     res.status(200).json(member);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  getAllMember: async (req, res) => {
    try {
      const members = await Member.aggregate([
        {
          $match: {
            _idFolder: req.params.id,
            isIntive: true,
            isActive: true,
            isSeenNoti: true,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_idUser",
            foreignField: "_id",
            as: "user",
          },
        },
        // {
        //   $lookup: {
        //     from: "folders",
        //     let: { idUser: { $toString: "$_idUser" } },
        //     let: { idFolder: { $toObjectId: "$_idFolder" } },
        //     pipeline: [
        //       {
        //         $match: {
        //           $expr: {
        //             $eq: ["$_idUser", "$$idUser"],
        //             $eq: ["$_id", "$$idFolder"],
        //           },
        //         },
        //       },
        //     ],
        //     as: "folder",
        //   },
        // }, //filter the admin of the group
      ]);
      // const usersArr = members.map((m) => m.user[0]);
      // const users = usersArr.map(({ password, ...others }) => others);
      const membersArr = members.map((items) => {
        const { password, ...others } = items;
        if (others.user) {
          others.user = others.user.map(({ password, ...user }) => user);
        }
        return others;
      });
      return res.status(200).json(membersArr);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getNotification: async (req, res) => {
    try {
      const noti = await Member.aggregate([
        {
          $match: {
            _idUser: mongoose.Types.ObjectId(`${req.params.id}`),
            isActive: false,
          },
        },
        {
          $lookup: {
            from: "folders",
            let: { idFolder: { $toObjectId: "$_idFolder" } },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$idFolder"],
                  },
                },
              },
            ],
            as: "folder",
          },
        },
      ]);
      const notiLength = await Member.aggregate([
        {
          $match: {
            _idUser: mongoose.Types.ObjectId(`${req.params.id}`),
            isActive: false,
            isSeenNoti: false,
          },
        },
        {
          $lookup: {
            from: "folders",
            let: { idFolder: { $toObjectId: "$_idFolder" } },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$idFolder"],
                  },
                },
              },
            ],
            as: "folder",
          },
        },
      ]);
      // const notiArr = noti.map((m) => m.folder);
      noti.push({ notiLength: notiLength.length });
      return res.status(200).json(noti);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateNotification: async (req, res) => {
    try {
      if (req.body.isNoti) {
        const noti = await Member.updateMany(
          { _idUser: mongoose.Types.ObjectId(`${req.body.idUser}`) },
          {
            $set: {
              isSeenNoti: req.body.isSeenNoti,
            },
          }
        );
      }
      if (req.body.isActive) {
        const noti = await Member.updateOne(
          { _id: mongoose.Types.ObjectId(`${req.body._id}`) },
          {
            $set: {
              isActive: req.body.isActive,
            },
          }
        );
      }
      if (req.body.delete) {
        const noti = await Member.deleteOne({ _id: req.body._id });
      }
      return res.status(200).json("Update was successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  deleteMember: async (req, res) => {
    try {
      const member = await Member.deleteOne({ _id: req.params.id });
      return res.status(200).json("Delete member was successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  leaveGroup: async (req, res) => {
    try {
      const member = await Member.deleteOne({
        $and: [
          { _idUser: mongoose.Types.ObjectId(`${req.body.idUser}`) },
          { _idFolder: req.body.idFolder },
        ],
      });
      return res.status(200).json("Leave group was successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
module.exports = memberController;
