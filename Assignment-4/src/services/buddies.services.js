const { writeJSON, readJSON } = require("../utilities/IO");
const setResponse = require("../utilities/setResponse").setResponse;

/**
 * It takes in an employee object, checks if the employee already exists in the database, and if not,
 * adds the employee to the database
 * @param employeeData - This is the data that you want to add to the database.
 * @returns A response object.
 */

const createBuddyService = (employeeData) => {
  let responseObject = setResponse();
  try {
    let employeeBuddies = readJSON();
    if (employeeBuddies instanceof Error) {
      throw employeeBuddies;
    }
    let alreadyExists = employeeBuddies.findIndex(
      (buddy) => buddy.employeeId == employeeData.employeeId
    );
    if (alreadyExists != -1) {
      responseObject = setResponse(400, "Employee Already Exists");
    } else {
      employeeBuddies.push(employeeData);
      writeJSON(employeeBuddies);
      responseObject = setResponse(201, "Buddy Added");
    }
  } catch (error) {
    if (responseObject.code == 200)
      responseObject = setResponse(500, error.toString());
  }
  return responseObject;
};

/**
 * It deletes a buddy from the database
 * @param employeeId - The id of the employee to be deleted.
 * @returns  A object of the response information.
 */
const deleteBuddyService = (employeeId) => {
  let responseObject = setResponse();
  try {
    let employeeBuddies = readJSON();
    if (employeeBuddies instanceof Error) {
      throw employeeBuddies;
    }
    console.log("emp buds ", employeeBuddies);
    let specificBuddyIndex = employeeBuddies.findIndex(
      (buddy) => buddy.employeeId == employeeId
    );
    if (specificBuddyIndex == -1) {
      responseObject = setResponse(404, "Employee does not Exist");
    } else {
      employeeBuddies.splice(specificBuddyIndex, 1);
      writeJSON(employeeBuddies);
      responseObject = setResponse(202, "Buddy deleted");
    }
  } catch (error) {
    responseObject = setResponse(500, error.toString());
  }
  return responseObject;
};

/**
 * It reads the database file and parses all employees Data , and returns the object as a string
 * @returns  A object of the employees DB .
 */
const listAllBuddiesService = () => {
  let responseObject = setResponse();
  try {
    let employeeBuddies = readJSON();
    if (employeeBuddies instanceof Error) {
      throw employeeBuddies;
    }
    responseObject = setResponse(
      202,
      "Retrieved All Buddies List",
      employeeBuddies
    );
  } catch (error) {
    responseObject = setResponse(500, error.toString());
  }
  return responseObject;
};

/**
 * It takes an employee key (employeeId or realName) and returns the employee's details
 * @param employeeKey - This is the key that is used to search for the employee. It can be either the
 * employeeId or the realName.
 * @returns A object of the response information.
 */
const listBuddyService = (employeeKey) => {
  let responseObject = setResponse();
  try {
    let employeeBuddies = readJSON();
    if (employeeBuddies instanceof Error) {
      throw employeeBuddies;
    }
    let specificBuddyIndex = employeeBuddies.findIndex(
      (buddy) =>
        buddy.employeeId == employeeKey || buddy.realName == employeeKey
    );
    if (specificBuddyIndex == -1) {
      responseObject = setResponse(404, "Employee does not Exist");
    } else {
      responseObject = setResponse(
        302,
        "Found Buddy",
        employeeBuddies[specificBuddyIndex]
      );
    }
  } catch (error) {
    responseObject = setResponse(500, error.toString());
  }
  return responseObject;
};

/**
 * It takes in an employeeId and newData as parameters, and updates the buddy with the employeeId with
 * the newData
 * @param employeeId - The employeeId of the buddy you want to update.
 * @param newData - This is the new data that you want to update the buddy with.
 * @returns  A object of the response information.
 */
const updateBuddyService = (employeeId, newData) => {
  let responseObject = setResponse();
  try {
    let employeeBuddies = readJSON();
    if (employeeBuddies instanceof Error) {
      throw employeeBuddies;
    }
    let buddyIndex = employeeBuddies.findIndex(
      (buddy) => buddy.employeeId == employeeId
    );
    if (buddyIndex == -1) {
      responseObject = setResponse(404, "Employee does not Exist");
    } else {
      let modifiableParameters = ["nickName", "hobbies"];
      for (let key of modifiableParameters) {
        employeeBuddies[buddyIndex][key] = newData[key];
      }
      writeJSON(employeeBuddies);
      responseObject = setResponse(202, "Buddy Data Updated");
    }
  } catch (error) {
    responseObject = setResponse(500, error.toString());
  }
  return responseObject;
};

module.exports = {
  createBuddyService,
  listBuddyService,
  listAllBuddiesService,
  updateBuddyService,
  deleteBuddyService,
};
