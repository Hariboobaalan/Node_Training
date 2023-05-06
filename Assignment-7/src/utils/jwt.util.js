require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SIGN = (username) =>
  jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30m",
  });
const JWT_VERIFY = (token) => {
  return jwt.verify(token.split(" ")[1].trim(), process.env.JWT_SECRET_KEY);
};
module.exports = { JWT_SIGN, JWT_VERIFY };
