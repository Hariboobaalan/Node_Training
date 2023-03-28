let listBuddy = require("../controllers/listBuddy");
let listAllBuddies = require("../controllers/listAllBuddies");

let express = require("express");
let router = express.Router();

router.use("/:key", listBuddy);
router.use("/", listAllBuddies);

module.exports = router;
