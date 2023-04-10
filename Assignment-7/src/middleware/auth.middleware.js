require("dotenv").config();
// importing the required modules
const jwt = require("jsonwebtoken");
const { debugLogger } = require("../utils/logger.util");
const { MESSAGES, ERRORS } = require("../constants/messages.constants");
const CODES = require("../constants/codes.constants");
const createLog = require("../utils/createlog.util");
// Authentication Middleware to authenticate the user to grant permission to perform CRUD operations on the tasks
/**
 * The function checks for the presence and validity of a JWT token and username in the request
 * headers, and verifies the token before allowing access to the next middleware function.
 * @param request - The request object represents the HTTP request that is being made to the server. It
 * contains information about the request, such as the URL, headers, and any data that is being sent in
 * the request body.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods for setting the status code, headers, and body of
 * the response.
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to move on to the next function after the current function has
 * completed its task.
 * @returns The function does not return anything. It either calls the `next()` function to move on to
 * the next middleware function or sends a response using the `response` object.
 */
function auth(request, response, next) {
  debugLogger.info("BEGIN: User Authentication");
  const jwtToken = request.header("x-auth-token");
  if (!jwtToken) {
    const responseObject = {
      status: CODES.UNAUTHORIZED,
      data: ERRORS.ACCESS_TOKEN_NOT_FOUND,
    };
    createLog(request, response, responseObject);
    return response
      .status(responseObject.status)
      .send({ message: responseObject.data });
  }
  const username = request.header("username");
  if (!username) {
    const responseObject = {
      status: CODES.UNAUTHORIZED,
      data: ERRORS.USERNAME_NOT_FOUND,
    };
    createLog(request, response, responseObject);
    return response
      .status(responseObject.status)
      .send({ message: responseObject.data });
  }
  try {
    const user = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    request.user = user.username;
    if (request.user !== username) {
      const responseObject = {
        status: CODES.BAD_REQUEST,
        data: ERRORS.UNAUTHORIZED_TOKEN,
      };
      createLog(request, response, responseObject);
      return response
        .status(responseObject.status)
        .send({ message: responseObject.data });
    }
    const responseObject = {
      status: CODES.OK,
      data: MESSAGES.AUTHENTICATION_SUCCESS,
    };
    createLog(request, response, responseObject);
    debugLogger.info("END: User Authentication");
    next();
  } catch (error) {
    let responseObject = {};
    if (error instanceof jwt.TokenExpiredError) {
      responseObject = {
        status: CODES.UNAUTHORIZED,
        data: ERRORS.ACCESS_TOKEN_EXPIRED,
        error: `${error.status || CODES.UNAUTHORIZED} - ${error} - ${
          error.stack
        }`,
      };
    } else {
      responseObject = {
        status: CODES.UNAUTHORIZED,
        data: ERRORS.INVALID_ACCESS_TOKEN,
        error: `${error.status || CODES.UNAUTHORIZED} - ${error} - ${
          error.stack
        }`,
      };
    }
    response
      .status(responseObject.status)
      .send({ message: responseObject.data });
    createLog(request, response, responseObject);
  }
}

module.exports = auth;
