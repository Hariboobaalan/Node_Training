let fs = require("fs");
const addBuddy = (request, response) => {
  let employeeBuddies = JSON.parse(fs.readFileSync(database, "UTF-8"));
  let newData = request.body;
  let alreadyExists = employeeBuddies.findIndex(
    (buddy) => buddy.employeeId == newData.employeeId
  );
  if (alreadyExists != -1) {
    response.send("EmployeeID already exists !!!");
  } else {
    employeeBuddies.push(newData);
    fs.writeFileSync(database, JSON.stringify(employeeBuddies));
    response.send("Buddy Added");
  }
};

module.exports = addBuddy;
