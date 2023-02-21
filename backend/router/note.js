const noteController = require("../controllers/noteController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();

router.get("/:id", middlewareController.verifyToken, noteController.readNote);
router.post("/", middlewareController.verifyToken, noteController.createNote);
router.put("/", middlewareController.verifyToken, noteController.updateNote);
router.delete(
  "/:id",
  middlewareController.verifyToken,
  noteController.deleteNote
);
module.exports = router;
