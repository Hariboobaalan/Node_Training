require("dotenv").config();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

/**
 * The function encrypts data using bcrypt hashing with a specified number of salt rounds.
 * @param data - The data parameter is the string that needs to be encrypted using bcrypt hashing
 * algorithm.
 * @returns The `encrypt` function is returning the hashed version of the `data` parameter using the
 * `bcrypt` library with the number of salt rounds specified by the `SALT_ROUNDS` constant.
 */
const encrypt = (data) => {
  return bcrypt.hashSync(data, SALT_ROUNDS);
};

/**
 * The function decrypts data by comparing it to a hash using bcrypt.
 * @param data - The data parameter is the plain text that needs to be compared with the hashed value.
 * @param hash - The `hash` parameter is a string that represents the hashed value of some data. It is
 * typically generated using a hashing algorithm like bcrypt, which takes in some data and produces a
 * fixed-length string that is unique to that data. The purpose of hashing is to protect sensitive
 * information by making it difficult to
 * @returns The function `decrypt` is returning the result of `bcrypt.compareSync(data, hash)`, which
 * is a boolean value indicating whether the `data` matches the `hash`.
 */
const decrypt = (data, hash) => {
  return bcrypt.compareSync(data, hash);
};

module.exports = { encrypt, decrypt };
