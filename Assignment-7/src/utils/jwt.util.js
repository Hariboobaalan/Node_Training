require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SIGN = (username) =>
  jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30m",
  });

module.exports = JWT_SIGN;
