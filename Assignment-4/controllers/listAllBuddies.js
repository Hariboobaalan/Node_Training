let fs = require("fs");
const listAllBuddies = (request, response) => {
  let employeeBuddies = JSON.parse(fs.readFileSync(database, "UTF-8"));
  if (employeeBuddies.length > 0) {
    response.send(employeeBuddies);
  } else {
    response.send("Employee List Empty");
  }
};
module.exports = listAllBuddies;
