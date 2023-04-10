// Importing the required modules and utility functions
const jwt = require("jsonwebtoken");
const { read, write } = require("../utils/io.util");
const { encrypt, decrypt } = require("../utils/cryption.util");
const CODES = require("../constants/codes.constants");
const { MESSAGES } = require("../constants/messages.constants");

// Service Function to check whether the user credential conflict with existing user credential in usersDB.
// It also encrypts the password using bcrypt and assigns a JWT token
// If User already exists it return User Already Exists, else adds the user to the usersDB
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
        expiresIn: "30m",
      });
      return { status: CODES.OK, token: jwtToken };
    }
    return result;
  }
  return { status: CODES.FORBIDDEN, data: MESSAGES.USER_ALREADY_EXISTS };
};

// Service Function to enable the user to login by verifying the credential and the jwtToken
// Thus granting permission to perform CRUD operations on the Tasks
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
    expiresIn: "30m",
  });
  return { status: CODES.OK, token: jwtToken };
};

module.exports = { registerUserService, loginUserService };
