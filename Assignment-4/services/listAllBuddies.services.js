const fs = require("fs");
/**
 * It reads the database file and parses all employees Data , and returns the object as a string
 * @returns  A stringified object of the employees DB .
 */
module.exports = function listAllBuddies() {
  let responseObject = "";
  try {
    let employeeBuddies = JSON.parse(fs.readFileSync(database, "UTF-8"));
    if (employeeBuddies.length == 0) {
      throw new Error("Employees Database is Empty");
    }
    responseObject = JSON.stringify(employeeBuddies);
  } catch (error) {
    responseObject = error.toString();
  }
  return responseObject;
};
