const fs = require("fs");
/**
 * It takes in an employee object, checks if the employee already exists in the database, and if not,
 * adds the employee to the database
 * @param employeeData - This is the data that you want to add to the database.
 * @returns A response string.
 */
module.exports = function createBuddy(employeeData) {
  let responseObject = "";
  try {
    let employeeBuddies = JSON.parse(fs.readFileSync(database, "UTF-8"));
    let alreadyExists = employeeBuddies.findIndex(
      (buddy) => buddy.employeeId == employeeData.employeeId
    );
    if (alreadyExists != -1) {
      throw new Error("Employee Already Exists");
    }
    employeeBuddies.push(employeeData);
    fs.writeFileSync(database, JSON.stringify(employeeBuddies));
    responseObject = "Buddy Added";
  } catch (error) {
    responseObject = error.toString();
  }
  return responseObject;
};
