let express = require("express");
let router = express.Router();

let deleteBuddy = require("../controllers/deleteBuddy");
router.use("/:eid", deleteBuddy);

module.exports = router;
