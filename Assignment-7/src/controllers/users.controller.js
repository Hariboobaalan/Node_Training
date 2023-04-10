// Importing the required modules
const { debugLogger } = require("../utils/logger.util");
const createLog = require("../utils/createlog.util");
// Importing the required user related services from services layer
const {
  registerUserService,
  loginUserService,
} = require("../services/users.services");

// Function to register the user, and store the user details in DB.
// If user credential conflicts with existing user, It returns User already Exists
const registerUser = (request, response) => {
  const username = request.body.username;
  const password = request.body.password;
  debugLogger.info(`BEGIN: Service > registerUserService`);
  let result = registerUserService(username, password);

  if (result.status === 200)
    return response.status(result.status).send({ token: result.token });
  console.log("REsponse stats = ", result.status);
  response.status(result.status).send({ message: result.data });
  createLog(request, response, result);
  debugLogger.info(`END: Service > registerUserService`);
};

// Function to enable the user to login and grant permission to perform CRUD operations on the tasks
const loginUser = (request, response) => {
  const username = request.body.username;
  const password = request.body.password;
  debugLogger.info(`BEGIN: Service > loginUserService`);
  let result = loginUserService(username, password);
  if (result.status === 200)
    return response.status(result.status).send({ token: result.token });
  response.status(result.status).send({ message: result.data });
  createLog(request, response, result);
  debugLogger.info(`END: Service > loginUserService`);
};
module.exports = { registerUser, loginUser };
