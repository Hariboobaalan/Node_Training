const buddyServices = require("../services/buddies.services");
const { debugLogger } = require("../utilities/logger.util");
const createLog = require("../utilities/createlog.util");
/**
 * CreateBuddy is a function that takes in a request and a response, and sends the request to a function in the buddyServices file with the request body as the argument.
 * @param request - This is the request object that contains the data sent from the client.
 * @param response - The response object is used to send data back to the client.
 */
function createBuddy(request, response) {
  debugLogger.info(`BEGIN: Service > createBuddy`);
  let { code, message, data } = buddyServices.createBuddyService(request.body);
  response.status(code).send({ code: code, message: message });
  createLog({
    code: code,
    message: message,
    data: data,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
  debugLogger.info(`END: Service > createBuddy`);
}

/**
 * It takes a request and a response, and sends the request parameter (buddyId) to the listBuddy function in listBuddyServices
 * @param request - This is the request object that contains the request information.
 * @param response - The response object is used to send data back to the client.
 */
function listBuddy(request, response) {
  debugLogger.info(`BEGIN: Service > listBuddy`);
  let { code, message, data } = buddyServices.listBuddyService(
    request.params.buddyId
  );
  response.status(code).send({ code: code, message: message, data: data });
  createLog({
    code: code,
    message: message,
    data: data,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
  debugLogger.info(`END: Service > listBuddy`);
}

/**
 * It takes a request and a response, and sends the response of the listAllBuddies function from the
 * buddyServices file
 * @param request - This is the request object that contains the request information.
 * @param response - The response object is used to send data back to the client.
 */
function listAllBuddies(request, response) {
  debugLogger.info(`BEGIN: Service > ListAllBuddies`);
  let { code, message, data } = buddyServices.listAllBuddiesService();
  response.status(code).send({ code: code, message: message, data: data });
  createLog({
    code: code,
    message: message,
    data: data,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
  debugLogger.info(`END: Service > getAllBuddies`);
}

/**
 * It takes a request and a response, and sends the response of the updateBuddy function in the
 * updateBuddyServices file
 * @param request - This is the request object that contains the data sent from the client.
 * @param response - The response object is used to send data back to the client.
 */
function updateBuddy(request, response) {
  debugLogger.info(`BEGIN: Service > updateBuddy`);
  let { code, message, data } = buddyServices.updateBuddyService(
    request.params.buddyId,
    request.body
  );
  response.status(code).send({ code: code, message: message });
  createLog({
    code: code,
    message: message,
    data: data,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
  debugLogger.info(`END: Service > updateBuddy`);
}

/**
 * It takes a request and a response, and sends the response of the deleteBuddy function in the
 * buddyServices file.
 * @param request - This is the request object that contains the data sent from the client.
 * @param response - The response object is used to send data back to the client.
 */
function deleteBuddy(request, response) {
  debugLogger.info(`BEGIN: Service > deleteBuddy`);
  let { code, message, data } = buddyServices.deleteBuddyService(
    request.params.buddyId
  );
  response.status(code).send({ code: code, message: message });
  createLog({ code: code, message: message, data: data });
  debugLogger.info(`END: Service > deleteBuddy`);
}

module.exports = {
  createBuddy,
  listBuddy,
  listAllBuddies,
  updateBuddy,
  deleteBuddy,
};
