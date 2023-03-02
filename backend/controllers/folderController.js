const mongoose = require("mongoose");
const Folder = require("../models/folder");
const Member = require("../models/member");
const Note = require("../models/note");
const User = require("../models/user");

const folderController = {
  addFolder: async (req, res) => {
    try {
      const newFolder = new Folder({
        name: req.body.name,
        _idUser: req.body._idUser,
        icon: req.body.icon,
        color: req.body.color,
      });
      const folder = await newFolder.save();
      const theOwner = new Member({
        _idUser: req.body._idUser,
        _idFolder: folder._id.valueOf(),
        isIntive: false,
        isActive: true,
        isSeenNoti: true,
      });
      await theOwner.save();
      return res.status(200).json(folder);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getAllFolder: async (req, res) => {
    try {
      const folder = await Folder.find({ _idUser: req.params.id });
      if (!folder) {
        return res.status(500).json("Can't find this folder");
      }
      return res.status(200).json(folder);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // createOwnerFolder: async(user, res) => {
  //     try {

  //         const owner = await user.save()
  //         return res.status(200).json(owner)
  //     }catch(err) {
  //         return res.status(500).json(err)
  //     }
  // },
  searchMemberFolder: async (req, res) => {
    try {
      const member = await User.findOne({ username: req.params.name });
      if (!member) {
        return res.status(400).json("Cant find this user!");
      }
      const isIntive = await Member.findOne({ _idUser: member._id });
      const { password, ...others } = member._doc;
      if (!isIntive) {
        return res.status(200).json({ ...others });
      }
      return res.status(200).json({ ...others, intive: isIntive });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  addMemberFolder: async (req, res) => {
    try {
      const newMember = new Member({
        _idUser: req.body.idUser,
        _idFolder: req.body.idFolder,
        isIntive: req.body.isIntive,
        isActive: req.body.isActive,
        isSeenNoti: req.body.isSeen,
      });
      await newMember.save();
      return res.status(200).json("Add member was successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateFolder: async (req, res) => {
    try {
      const folder = await Folder.updateOne(
        {
          _id: req.params.id,
        },
        {
          name: req.body.newName,
          icon: req.body.newIcon,
          color: req.body.newColor,
        }
      );
      if (!folder) return res.status(401).json("error");
      return res.status(200).json("Update is successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  deleteFolder: async (req, res) => {
    // need check own the folder
    try {
      await Folder.deleteOne({
        _id: req.params.id,
      });
      await Member.deleteOne({
        _idFolder: req.params.id,
      });
      await Note.deleteMany({
        _idFolder: req.params.id,
      });
      return res.status(200).json("Delete is successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
module.exports = folderController;
