const folderController = require("../controllers/folderController")
const middlewareController = require("../controllers/middlewareController")

const router = require("express").Router()

router.get("/:id", middlewareController.verifyToken, folderController.getAllFolder)
router.post("/", middlewareController.verifyToken, folderController.addFolder)

module.exports = router