/* Importing Required Modules */
let express = require("express");
let router = express.Router();
const CODES = require("../constants/codes.constants");
const INVALID_URL = require("../constants/messages.constants").ERRORS
  .INVALID_URL;
// Importing the required user related controllers from the controller layer
const { registerUser, loginUser } = require("../controllers/users.controller");
const { validator, userSchema } = require("../middleware/validator.middleware");
/* Setting up the routes for the specified services */
router.post("/register", validator(userSchema), registerUser);
router.post("/login", validator(userSchema), loginUser);

// Handler to handle the INVALID_URL requests
router.all(/^\/(.+)/, (request, response) => {
  response.status(CODES.NOT_FOUND).send({ error: INVALID_URL });
});

module.exports = router;
