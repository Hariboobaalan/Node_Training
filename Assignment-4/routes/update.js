let express = require("express");
let router = express.Router();

let updateBuddy = require("../controllers/updateBuddy");
router.use("/:key", updateBuddy);

module.exports = router;
