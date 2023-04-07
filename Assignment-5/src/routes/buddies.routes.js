/* Importing Required Modules */
let express = require("express");
let router = express.Router();
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
  response
    .status(404)
    .send({ error: `INVALID URL Cannot ${request.method} request` });
});

module.exports = router;
