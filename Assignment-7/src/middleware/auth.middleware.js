require("dotenv").config();
// importing the required modules
const jwt = require("jsonwebtoken");
const { MESSAGES, ERRORS } = require("../constants/messages.constants");
const CODES = require("../constants/codes.constants");
const createLog = require("../utils/createlog.util");
const LOGGER = require("../utils/logger.util");

// Authentication Middleware to authenticate the user to grant permission to perform CRUD operations on the tasks
function auth(request, response, next) {
  LOGGER.debug("BEGIN: User Authentication");
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
    LOGGER.debug("END: User Authentication");
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
