require("dotenv").config();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

/**
 * The function encrypts data using bcrypt hashing with a specified number of salt rounds.
 * @param data - The data parameter to be encrypted using bcrypt
 * @returns The `encrypt` function is returning the hashed version of `data` .
 */
const encrypt = (data) => {
  return bcrypt.hashSync(data, SALT_ROUNDS);
};

/**
 * The function decrypts data by comparing it to a hash using bcrypt.
 * @param data - The data parameter is the plain text that needs to be compared with the hashed value.
 * @param hash - The `hash` parameter is a string that represents the hashed value of some data.
 * @returns The function `decrypt` compares the data and the hash and returns a boolean value
 */
const decrypt = (data, hash) => {
  return bcrypt.compareSync(data, hash);
};

module.exports = { encrypt, decrypt };
