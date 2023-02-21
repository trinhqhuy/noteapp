const folderController = require("../controllers/folderController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();

router.get(
  "/:id",
  middlewareController.verifyToken,
  folderController.getAllFolder
);
router.post("/", middlewareController.verifyToken, folderController.addFolder);
router.put(
  "/:id",
  middlewareController.verifyToken,
  folderController.updateFolder
);
router.delete(
  "/:id",
  middlewareController.verifyToken,
  folderController.deleteFolder
);
module.exports = router;
