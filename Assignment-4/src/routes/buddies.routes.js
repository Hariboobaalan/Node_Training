/* Importing Required Modules */
let express = require("express");
let router = express.Router();
const {
  payloadSchema,
  updateschema,
  validator,
} = require("../middleware/validator.middleware");

const {
  createBuddy,
  listBuddy,
  listAllBuddies,
  updateBuddy,
  deleteBuddy,
} = require("../controllers/buddies.controller");

router.post("/", validator(payloadSchema), createBuddy);
router.get("/:buddyId", listBuddy);
router.get("/", listAllBuddies);
router.put("/:buddyId", validator(updateschema), updateBuddy);
router.delete("/:buddyId", deleteBuddy);
router.use("/", (request, response) => {
  response.status(400).send({ error: "INVALID URL" });
});

module.exports = router;
