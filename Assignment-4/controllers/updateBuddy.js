let fs = require("fs");
const updateBuddy = (request, response) => {
  let empIdParam = request.params.key;
  let newData = request.body;
  let employeeBuddies = JSON.parse(fs.readFileSync(database, "UTF-8"));
  let buddyIndex = employeeBuddies.findIndex(
    (buddy) => buddy.employeeId == empIdParam
  );

  if (buddyIndex != -1) {
    let accessDenied = false;
    for (let key of Object.keys(newData)) {
      switch (key) {
        case "employeeId":
          accessDenied = true;
          break;
        case "realName":
          accessDenied = true;
          break;
        case "dob":
          accessDenied = true;
          break;
        default:
          employeeBuddies[buddyIndex][key] = newData[key];
          break;
      }
      if (accessDenied) {
        response.send("ACCESS DENIED: Can't Modify data");
      }
    }

    fs.writeFileSync(database, JSON.stringify(employeeBuddies));
    response.send("Buddy Data Updated");
  } else {
    response.send("Employee Does not Exist");
  }
};
module.exports = updateBuddy;
