let express = require("express");
let router = express.Router();

const createBuddy = require("../controllers/createBuddy.controller"),
  listBuddy = require("../controllers/listBuddy.controller"),
  listAllBuddies = require("../controllers/listAllBuddies.controller"),
  updateBuddy = require("../controllers/updateBuddy.controller"),
  deleteBuddy = require("../controllers/deleteBuddy.controller");

router.get("/listAll", listAllBuddies);
router.get("/list/:uid", listBuddy);
router.post("/create", createBuddy);
router.put("/:uid/update", updateBuddy);
router.delete("/:uid/delete", deleteBuddy);

module.exports = router;
