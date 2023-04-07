/* Importing Required Modules */
let express = require("express");
let router = express.Router();
const { validator } = require("../middleware/validator.middleware");

const {} = require("../controllers/tasks.controller");

/* Setting up the routes for the specified services */

router.all("/", (request, response) => {
  response
    .status(404)
    .send({ error: `INVALID URL, Cannot ${request.method} request` });
});

module.exports = router;
