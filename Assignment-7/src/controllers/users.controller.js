// Importing the required modules
const createLog = require("../utils/createlog.util");
// Importing the required user related services from services layer
const {
  registerUserService,
  loginUserService,
} = require("../services/users.services");
const LOGGER = require("../utils/logger.util");

// Function to register the user, and store the user details in DB.
// If user credential conflicts with existing user, It returns User already Exists
const registerUser = (request, response) => {
  LOGGER.debug(`BEGIN: Service > registerUserService`);
  const username = request.body.username;
  const password = request.body.password;
  let result = registerUserService(username, password);

  if (result.status === 200)
    return response.status(result.status).send({ token: result.token });
  response.status(result.status).send({ message: result.data });
  createLog(request, response, result);
  LOGGER.debug(`END: Service > registerUserService`);
};

// Function to enable the user to login and grant permission to perform CRUD operations on the tasks
const loginUser = (request, response) => {
  LOGGER.debug(`BEGIN: Service > loginUserService`);
  const username = request.body.username;
  const password = request.body.password;
  let result = loginUserService(username, password);
  if (result.status === 200)
    return response.status(result.status).send({ token: result.token });
  response.status(result.status).send({ message: result.data });
  createLog(request, response, result);
  LOGGER.debug(`END: Service > loginUserService`);
};
module.exports = { registerUser, loginUser };
