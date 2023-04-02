const fs = require("fs");
/**
 * It deletes a buddy from the database
 * @param employeeId - The id of the employee to be deleted.
 * @returns  A String of the response information.
 */
module.exports = function deleteBuddy(employeeId) {
  let responseObject = "";
  try {
    let employeeBuddies = JSON.parse(fs.readFileSync(database, "UTF-8"));
    let specificBuddyIndex = employeeBuddies.findIndex(
      (buddy) => buddy.employeeId == employeeId
    );
    if (specificBuddyIndex == -1) {
      throw new Error("Employee does not Exist");
    }
    employeeBuddies.splice(specificBuddyIndex, 1);
    fs.writeFileSync(database, JSON.stringify(employeeBuddies));
    responseObject = "Buddy deleted";
  } catch (error) {
    responseObject = error.toString();
  }
  return responseObject;
};
