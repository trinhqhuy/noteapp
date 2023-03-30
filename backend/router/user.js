const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");
const router = require("express").Router();

router.put(
  "/",
  middlewareController.verifyToken,
  userController.updateInfoUser
);
module.exports = router;
