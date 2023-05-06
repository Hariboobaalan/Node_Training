// importing required modules
const LOGGER = require("../utils/logger.util");
const createLog = require("../utils/createlog.util");
// Importing the required task related services from services layer
const {
  addTaskService,
  readTaskService,
  readAllTasksService,
  updateTaskService,
  deleteTaskService,
} = require("../services/tasks.services");

// Function to call the addTaskService and add the incoming task payload to the user DB.
// If task already exists, it returns Task Already Exists
const addTask = (request, response) => {
  LOGGER.debug(`BEGIN: Service > addTask`);
  let result = addTaskService(request.user, request.body);
  response.status(result.status).send({ message: result.data });
  createLog(request, response, result);
  LOGGER.debug(`END: Service > addTask`);
};

// Function to fetch and display the tasks in the tasksDB of a user
// If Tasklist is empty it return Data Not Found
const readAllTasks = (request, response) => {
  LOGGER.debug(`BEGIN: Service > getAllTasks`);
  let result = readAllTasksService(request.user, request.query);
  if (result.status === 200) response.status(result.status).send(result.data);
  else response.status(result.status).send({ message: result.data });
  createLog(request, response, result);
  LOGGER.debug(`END: Service > getAllTasks`);
};

// Function to fetch and display a specific task from the UserDB
// If task doesn't exist, It return Task Not Found
const readTask = (request, response) => {
  LOGGER.debug(`BEGIN: Service > getTask`);
  let result = readTaskService(request.user, request.params.id);
  if (result.status === 200) response.status(result.status).send(result.data);
  else response.status(result.status).send({ message: result.data });
  createLog(request, response, result);
  LOGGER.debug(`END: Service > getTask`);
};

// Function to update the specified task by TaskID
// If task is not found it returns Task Not Found
const updateTask = (request, response) => {
  LOGGER.debug(`BEGIN: Service > updateTask`);
  let result = updateTaskService(request.user, request.params.id, request.body);
  response.status(result.status).send({ message: result.data });
  createLog(request, response, result);
  LOGGER.debug(`END: Service > updateTask`);
};

// Function to delete the specified task by TaskID
// If task is not found it returns Task Not Found
const deleteTask = (request, response) => {
  LOGGER.debug(`BEGIN: Service > deleteTask`);
  let result = deleteTaskService(request.user, request.params.id);
  response.status(result.status).send({ message: result.data });
  createLog(request, response, result);
  LOGGER.debug(`END: Service > deleteTask`);
};

module.exports = {
  addTask,
  readTask,
  readAllTasks,
  updateTask,
  deleteTask,
};
