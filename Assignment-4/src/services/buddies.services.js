const { writeJSON, readJSON } = require("../utils/io.utils");
const setResponse = require("../utils/response.util").setResponse;
const message = require("../constants/messages.constants");
const code = require("../constants/codes.constants");

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
      responseObject = setResponse(code.BAD_REQUEST, message.ALREADY_EXIST);
    } else {
      employeeBuddies.push(employeeData);
      writeJSON(employeeBuddies);
      responseObject = setResponse(code.OK, message.ADD_SUCCESS);
    }
  } catch (error) {
    if (responseObject.code == code.OK)
      responseObject = setResponse(
        code.INTERNAL_SERVER_ERROR,
        error.toString()
      );
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
      responseObject = setResponse(code.NOT_FOUND, message.NOT_FOUND);
    } else {
      responseObject = setResponse(
        code.OK,
        message.FOUND,
        employeeBuddies[specificBuddyIndex]
      );
    }
  } catch (error) {
    responseObject = setResponse(code.INTERNAL_SERVER_ERROR, error.toString());
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
      code.OK,
      message.RETRIEVED_ALL,
      employeeBuddies
    );
  } catch (error) {
    responseObject = setResponse(code.INTERNAL_SERVER_ERROR, error.toString());
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
      responseObject = setResponse(code.NOT_FOUND, message.NOT_FOUND);
    } else {
      let modifiableParameters = ["nickName", "hobbies"];
      for (let key of modifiableParameters) {
        employeeBuddies[buddyIndex][key] = newData[key];
      }
      writeJSON(employeeBuddies);
      responseObject = setResponse(code.OK, message.UPDATE_SUCCESS);
    }
  } catch (error) {
    responseObject = setResponse(code.INTERNAL_SERVER_ERROR, error.toString());
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
    let specificBuddyIndex = employeeBuddies.findIndex(
      (buddy) => buddy.employeeId == employeeId
    );
    if (specificBuddyIndex == -1) {
      responseObject = setResponse(code.NOT_FOUND, message.NOT_FOUND);
    } else {
      employeeBuddies.splice(specificBuddyIndex, 1);
      writeJSON(employeeBuddies);
      responseObject = setResponse(code.OK, message.DELETE_SUCCESS);
    }
  } catch (error) {
    responseObject = setResponse(code.INTERNAL_SERVER_ERROR, error.toString());
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
