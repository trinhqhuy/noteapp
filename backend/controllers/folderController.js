const mongoose = require("mongoose");
const Folder = require("../models/folder");
const Member = require("../models/member");
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
  addMemberFolder: async (req, res) => {
    try {
      const newMember = new Member({
        _idUser: req.body.idUser,
        _idFolder: req.body.idFolder,
        isActive: req.body.isActive,
        isSeenNoti: req.body.isSeen,
      });
      const member = await newMember.save();
      return res.status(200).json(member);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
module.exports = folderController;
