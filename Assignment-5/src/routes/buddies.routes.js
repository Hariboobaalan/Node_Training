/* Importing Required Modules */
let express = require("express");
let router = express.Router();
const { INVALID_URL } = require("../constants/messages.constants");
const { BAD_REQUEST } = require("../constants/codes.constants");
const {
  payloadSchema,
  updateSchema,
  validator,
} = require("../middleware/validator.middleware");

const {
  createBuddy,
  listBuddy,
  listAllBuddies,
  updateBuddy,
  deleteBuddy,
} = require("../controllers/buddies.controller");

/* Setting up the routes for the specified services */
router.post("/", validator(payloadSchema), createBuddy);
router.get("/:buddyId", listBuddy);
router.get("/", listAllBuddies);
router.put("/:buddyId", validator(updateSchema), updateBuddy);
router.delete("/:buddyId", deleteBuddy);
router.all("/", (request, response) => {
  response.status(BAD_REQUEST).send({ error: INVALID_URL });
});

module.exports = router;
