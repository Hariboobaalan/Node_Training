/* Importing FileSystem module */
const fs = require("fs");

require("dotenv").config();
const database = process.env.DATABASE_URL;

/**
 * The function writes JSON data to a file and returns an error if the data is invalid or if it is
 * unable to write to the file.
 * @param data - The `data` parameter is an object that needs to be converted to a JSON string and
 * written to a file.
 * @returns either an Error object with the message "Unable to write to DB" if there was an error
 * writing to the database file, or an Error object with the message "Invalid data format" if the data
 * passed to the function is not in a valid JSON format. If there are no errors, the function does not
 * return anything.
 */
const writeJSON = (data) => {
  try {
    let content = JSON.stringify(data);
    try {
      fs.writeFileSync(database, content);
    } catch (error) {
      return new Error("Unable to write to DB");
    }
  } catch (error) {
    return new Error("Invalid data format");
  }
};
/**
 * The function reads a JSON file and returns its contents, or returns an error if the file is
 * corrupted.
 * @returns The `readJSON` function is returning the parsed JSON data from the `database` file if it
 * exists and is valid. If the file is corrupted or does not exist, it returns a new `Error` object
 * with the message "Corrupted File".
 */
const readJSON = () => {
  try {
    return JSON.parse(fs.readFileSync(database, "utf-8"));
  } catch (e) {
    return new Error("Curropted File");
  }
};

module.exports = { writeJSON, readJSON };
