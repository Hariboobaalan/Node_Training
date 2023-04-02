const fs = require("fs");
/**
 * It takes an employee key (employeeId or realName) and returns the employee's details
 * @param employeeKey - This is the key that is used to search for the employee. It can be either the
 * employeeId or the realName.
 * @returns A stringified object of the employee's information.
 */
module.exports = function listBuddy(employeeKey) {
  let responseObject = "";
  try {
    let employeeBuddies = JSON.parse(fs.readFileSync(database, "UTF-8"));
    let specificBuddyIndex = employeeBuddies.findIndex(
      (buddy) =>
        buddy.employeeId == employeeKey || buddy.realName == employeeKey
    );
    if (specificBuddyIndex == -1) {
      throw new Error("Employee does not Exist");
    }
    responseObject = JSON.stringify(employeeBuddies[specificBuddyIndex]);
  } catch (error) {
    responseObject = error.toString();
  }
  return responseObject;
};
