// importing required modules
const { debugLogger } = require("../utils/logger.util");
const createLog = require("../utils/createlog.util");
// Importing the required task related services from services layer
const {
  addTaskService,
  readTaskService,
  readAllTasksService,
  updateTaskService,
  deleteTaskService,
} = require("../services/tasks.services");

/**
 * This function adds a task and sends a response with a status and message.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request method. It is typically passed
 * as an argument to a function that handles the request and generates a response.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow the server to set the
 * status code, headers, and body of the response. In this code snippet, the `response` object is used
 * to send a
 */
const addTask = (request, response) => {
  debugLogger.info(`BEGIN: Service > addTask`);
  let result = addTaskService(request.user, request.body);
  response.status(result.status).send({ message: result.data });
  createLog(request, response, result);
  debugLogger.info(`END: Service > addTask`);
};

/**
 * This function reads all tasks and sends a response with the result.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request method, and request URL. It is
 * typically passed as an argument to a function that handles the request and generates a response.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow the server to set the
 * status code, headers, and body of the response. In this code snippet, the `response` object is used
 * to send the
 */
const readAllTasks = (request, response) => {
  debugLogger.info(`BEGIN: Service > getAllTasks`);
  let result = readAllTasksService(request.user, request.query);
  if (result.status === 200) response.status(result.status).send(result.data);
  else response.status(result.status).send({ message: result.data });
  createLog(request, response, result);
  debugLogger.info(`END: Service > getAllTasks`);
};

/**
 * This function reads a task and sends a response with the task data or an error message.
 * @param request - The `request` parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request parameters, and request body. It is typically
 * passed as the first parameter to an Express route handler function.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow the server to set the
 * status code, headers, and body of the response. In this code snippet, the `response` object is used
 * to send the
 */
const readTask = (request, response) => {
  debugLogger.info(`BEGIN: Service > getTask`);
  let result = readTaskService(request.user, request.params.id);
  if (result.status === 200) response.status(result.status).send(result.data);
  else response.status(result.status).send({ message: result.data });
  createLog(request, response, result);
  debugLogger.info(`END: Service > getTask`);
};

/**
 * This function updates a task and sends a response with a status and message.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request parameters, request body, and user information.
 * It is typically passed as an argument to a function that handles the request and generates a
 * response.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow the server to set the
 * status code, headers, and body of the response. In this code snippet, the `response` object is used
 * to send a
 */
const updateTask = (request, response) => {
  debugLogger.info(`BEGIN: Service > updateTask`);
  let result = updateTaskService(request.user, request.params.id, request.body);
  response.status(result.status).send({ message: result.data });
  createLog(request, response, result);
  debugLogger.info(`END: Service > updateTask`);
};

/**
 * This function handles a request to delete a task and sends a response with a status and message.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request parameters, request body, and user information.
 * It is typically passed as an argument to a function that handles the request and generates a
 * response.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow the server to set the
 * status code, headers, and body of the response. In this code snippet, the `response` object is used
 * to send a
 */
const deleteTask = (request, response) => {
  debugLogger.info(`BEGIN: Service > deleteTask`);
  let result = deleteTaskService(request.user, request.params.id);
  response.status(result.status).send({ message: result.data });
  createLog(request, response, result);
  debugLogger.info(`END: Service > deleteTask`);
};

module.exports = {
  addTask,
  readTask,
  readAllTasks,
  updateTask,
  deleteTask,
};
