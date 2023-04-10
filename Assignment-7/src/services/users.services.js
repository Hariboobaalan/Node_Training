// Importing the required modules and utility functions
const jwt = require("jsonwebtoken");
const { read, write } = require("../utils/io.util");
const { encrypt, decrypt } = require("../utils/cryption.util");
const CODES = require("../constants/codes.constants");
const { MESSAGES } = require("../constants/messages.constants");

/**
 * The function registers a new user by checking if the user already exists in the database, encrypting
 * their password, and returning a JWT token if successful.
 * @param username - The username of the user who is trying to register.
 * @param password - The password parameter is a string representing the user's password that will be
 * encrypted before being stored in the database.
 * @returns an object with a `status` property and either a `token` or `data` property depending on the
 * outcome of the function. If the `usersDB` object has a `status` property with a value of
 * `CODES.INTERNAL_SERVER_ERROR`, then the function returns the `usersDB` object. If the `username`
 * already exists in the `usersDB` data,
 */
const registerUserService = (username, password) => {
  const usersDB = read(process.env.USERS_DATABASE_URL);
  if (usersDB.status === CODES.INTERNAL_SERVER_ERROR) {
    return usersDB;
  }
  if (!usersDB.data.some((user) => user.username === username)) {
    usersDB.data.push({ username, password: encrypt(password) });
    let result = write(process.env.USERS_DATABASE_URL, usersDB.data);
    if (result.status === CODES.OK) {
      const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
        expiresIn: "24h",
      });
      return { status: CODES.OK, token: jwtToken };
    }
    return result;
  }
  return { status: CODES.FORBIDDEN, data: MESSAGES.USER_ALREADY_EXISTS };
};

/**
 * The function takes in a username and password, checks if the user exists in a database and if the
 * password is correct, and returns a JWT token if successful.
 * @param username - The username of the user trying to log in.
 * @param password - The password parameter is a string representing the user's password that they are
 * trying to use to log in.
 * @returns an object with a `status` property and either a `data` or `token` property depending on the
 * outcome of the login attempt. If the `usersDB` status is an internal server error, the function
 * returns the `usersDB` object. If the user is not found in the database, the function returns an
 * object with a `status` property of `CODES.NOT
 */
const loginUserService = (username, password) => {
  const usersDB = read(process.env.USERS_DATABASE_URL);
  if (usersDB.status === CODES.INTERNAL_SERVER_ERROR) {
    return usersDB;
  }
  let user = usersDB.data.find((user) => user.username == username) || [];
  if (user.length === 0)
    return { status: CODES.NOT_FOUND, data: MESSAGES.USER_NOT_FOUND };
  if (!decrypt(password, user.password)) {
    return { status: CODES.FORBIDDEN, data: MESSAGES.INVALID_PASSWORD };
  }
  const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
  return { status: CODES.OK, token: jwtToken };
};

module.exports = { registerUserService, loginUserService };
