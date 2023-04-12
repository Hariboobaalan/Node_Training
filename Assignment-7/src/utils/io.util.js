require("dotenv").config();
// Importing the required modules
const fs = require("fs");
const CODES = require("../constants/codes.constants");
const { ERRORS, MESSAGES } = require("../constants/messages.constants");
/**
 * The function writes data to a file in JSON format and returns a status and message indicating
 * success or failure.
 * @param filePath - The file path where the data will be written to.
 * @param data - The data parameter is the data that needs to be written to a file in JSON format.
 * @returns The `write` function returns an object with `status`, `data`, and `error` properties. The
 * `status` property indicates the status code of the response, the `data` property contains a message
 * or data related to the response, and the `error` property contains an error message or stack trace
 * if an error occurred during the execution of the function.
 */
const writeJSON = (filePath, data) => {
  try {
    let content = JSON.stringify(data);
    try {
      fs.writeFileSync(filePath, content);
      return {
        status: CODES.OK,
        data: MESSAGES.WRITE_SUCCESS,
      };
    } catch (error) {
      return {
        status: CODES.INTERNAL_SERVER_ERROR,
        data: ERRORS.WRITE_ERROR,
        error: `${error.status || CODES.INTERNAL_SERVER_ERROR} | ${error} | ${
          error.stack
        }`,
      };
    }
  } catch (error) {
    return {
      status: CODES.INTERNAL_SERVER_ERROR,
      data: ERRORS.INVALID_FORMAT,
      error: `${error.status || CODES.INTERNAL_SERVER_ERROR} | ${error} | ${
        error.stack
      }`,
    };
  }
};

/**
 * The function reads a file from a given file path, parses it as JSON, and returns the data or an
 * error message.
 * @param filePath - The file path of the file to be read.
 * @returns It depends on the input and the execution of the function. If the function is able to
 * successfully read and parse the file at the given `filePath`, it will return an object with a
 * `status` property set to `CODES.OK` and a `data` property set to the parsed JSON data. If there is
 * an error while parsing the data, it will return an object with a `status
 */
const readJSON = (filePath) => {
  try {
    let data = fs.readFileSync(filePath, "utf-8");
    try {
      return { status: CODES.OK, data: JSON.parse(data) };
    } catch (error) {
      return {
        status: CODES.INTERNAL_SERVER_ERROR,
        data: ERRORS.CORRUPTED_DB,
        error: `${error.status || CODES.INTERNAL_SERVER_ERROR} | ${error} | ${
          error.stack
        }`,
      };
    }
  } catch (error) {
    return {
      status: CODES.INTERNAL_SERVER_ERROR,
      data: ERRORS.DATABASE_NOT_FOUND,
      error: `${error.status || CODES.INTERNAL_SERVER_ERROR} | ${error} | ${
        error.stack
      }`,
    };
  }
};

module.exports = { readJSON, writeJSON };
