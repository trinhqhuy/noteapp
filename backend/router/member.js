const mongoose = require("mongoose");
const memberController = require("../controllers/memberController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();

router.get(
  "/:id",
  middlewareController.verifyToken,
  memberController.getAllMember
);
router.post(
  "/",
  middlewareController.verifyToken,
  memberController.searchMemberFolder
);
router.get(
  "/noti/:id",
  middlewareController.verifyToken,
  memberController.getNotification
);
router.post(
  "/updatenoti/",
  middlewareController.verifyToken,
  memberController.updateNotification
);
router.get(
  "/delete/:id",
  middlewareController.verifyToken,
  memberController.deleteMember
);
router.post(
  "/leave/",
  middlewareController.verifyToken,
  memberController.leaveGroup
);
module.exports = router;
