// Importing the required modules
const { debugLogger } = require("../utils/logger.util");
const createLog = require("../utils/createlog.util");
// Importing the required user related services from services layer
const {
  registerUserService,
  loginUserService,
} = require("../services/users.services");

/**
 * This function registers a user and returns a token or an error message based on the result.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request method, headers, URL, and request body. In this code snippet, the
 * request object is used to extract the username and password from the request body.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client who made the request. It contains methods and properties that allow the
 * server to send data back to the client, such as `status()` to set the HTTP status code, `send()` to
 * send
 * @returns The function `registerUser` is returning either a response with a status of 200 and a token
 * in the body, or a response with a status other than 200 and a message in the body. The specific
 * response that is returned depends on the result of calling the `registerUserService` function with
 * the `username` and `password` parameters.
 */
const registerUser = (request, response) => {
  const username = request.body.username;
  const password = request.body.password;
  debugLogger.info(`BEGIN: Service > registerUserService`);
  let result = registerUserService(username, password);

  if (result.status === 200)
    return response.status(result.status).send({ token: result.token });
  response.status(result.status).send({ message: result.data });
  createLog(request, response, result);
  debugLogger.info(`END: Service > registerUserService`);
};

/**
 * This function handles user login requests and returns a token if successful or an error message if
 * unsuccessful.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request method, headers, URL, and request body. In this code snippet, it
 * is used to extract the username and password from the request body.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow the server to send data
 * back to the client, such as `status()` to set the HTTP status code, and `send()` to send the
 * response body
 * @returns The function `loginUser` is returning either a response with a status of 200 and a token in
 * the body, or a response with a status other than 200 and a message in the body. The specific
 * response that is returned depends on the result of calling the `loginUserService` function with the
 * provided `username` and `password` parameters.
 */
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
