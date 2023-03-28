let fs = require("fs");
const deleteBuddy = (request, response) => {
  let empIdParam = request.params.eid;
  let employeeBuddies = JSON.parse(fs.readFileSync(database, "UTF-8"));
  let buddyIndex = employeeBuddies.findIndex(
    (buddy) => buddy.employeeId == empIdParam
  );
  if (buddyIndex != -1) {
    employeeBuddies.splice(buddyIndex, 1);
    fs.writeFileSync(database, JSON.stringify(employeeBuddies));
    response.send("Buddy deleted");
  } else {
    response.send("Employee does not exist");
  }
};
module.exports = deleteBuddy;
