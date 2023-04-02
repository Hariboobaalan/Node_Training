const fs = require("fs");
/**
 * It takes in an employeeId and newData as parameters, and updates the buddy with the employeeId with
 * the newData
 * @param employeeId - The employeeId of the buddy you want to update.
 * @param newData - This is the new data that you want to update the buddy with.
 * @returns  A String of the response information.
 */
module.exports = function updateBuddy(employeeId, newData) {
  let responseObject = "";
  try {
    let employeeBuddies = JSON.parse(fs.readFileSync(database, "UTF-8"));
    let buddyIndex = employeeBuddies.findIndex(
      (buddy) => buddy.employeeId == employeeId
    );
    if (buddyIndex == -1) {
      throw new Error("Employee does not Exist");
    }

    let accessDenied = false;
    for (let key of Object.keys(newData)) {
      switch (key) {
        case "employeeId":
        case "realName":
        case "dob":
          accessDenied = true;
          break;
        default:
          employeeBuddies[buddyIndex][key] = newData[key];
          break;
      }
      if (accessDenied) {
        responseObject = "ACCESS DENIED: Can't Modify data";
        return responseObject;
      }
    }
    fs.writeFileSync(database, JSON.stringify(employeeBuddies));
    responseObject = "Buddy Data Updated";
  } catch (error) {
    responseObject = error.toString();
  }
  return responseObject;
};
