/* Importing Required Modules */
let express = require("express");
const CODES = require("../constants/codes.constants");
const INVALID_URL = require("../constants/messages.constants").ERRORS
  .INVALID_URL;
/* Importing the required Tasks related Controllers from the Controllers layer*/
const {
  addTask,
  readTask,
  readAllTasks,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");
/* Importing the validator and schema to validate the structure of the incoming payload */
const {
  validator,
  createTaskSchema,
  updateTaskSchema,
} = require("../middleware/validator.middleware");

let router = express.Router();

/* Setting up the routes for the specified services */
router.post("/", validator(createTaskSchema), addTask);
router.get("/", readAllTasks);
router.get("/:id", readTask);
router.put("/:id", validator(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

// Handler to handle the INVALID_URL requests
router.all(/^\/(.+)/, (request, response) => {
  response.status(CODES.NOT_FOUND).send({ error: INVALID_URL });
});

module.exports = router;
