let fs = require("fs");
const listBuddy = (request, response) => {
  let empIdParam = request.params.key;
  let employeeBuddies = JSON.parse(fs.readFileSync(database, "UTF-8"));
  let specificBuddyIndex = employeeBuddies.findIndex(
    (buddy) => buddy.employeeId == empIdParam || buddy.realName == empIdParam
  );

  if (specificBuddyIndex != -1) {
    response.send(employeeBuddies[specificBuddyIndex]);
  } else {
    response.send("Employee Not Found !");
  }
};
module.exports = listBuddy;
