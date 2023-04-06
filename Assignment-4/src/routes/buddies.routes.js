/* Importing Required Modules */
let express = require("express");
let router = express.Router();
const middleware = require("../middleware/middleware");

const {
  createBuddy,
  listBuddy,
  listAllBuddies,
  updateBuddy,
  deleteBuddy,
} = require("../controllers/buddies.controller");

router.post("/", middleware(), createBuddy);
router.get("/:buddyId", listBuddy);
router.get("/", listAllBuddies);
router.put("/:buddyId", middleware(), updateBuddy);
router.delete("/:buddyId", deleteBuddy);
router.use("/", (request, response) => {
  response.status(404).send({ error: "Cannot get request" });
});

module.exports = router;
