let express = require("express");
let router = express.Router();

let addBuddy = require("../controllers/createBuddy");
router.use("/", addBuddy);

module.exports = router;
