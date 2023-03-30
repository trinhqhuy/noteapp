const folderController = require("../controllers/folderController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();

router.get(
  "/:id",
  middlewareController.verifyToken,
  folderController.getAllFolder
);
// router.get(
//   "/search/:name",
//   middlewareController.verifyToken,
//   folderController.searchMemberFolder
// );
router.post("/", middlewareController.verifyToken, folderController.addFolder);
router.post(
  "/add",
  middlewareController.verifyToken,
  folderController.addMemberFolder
);
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
