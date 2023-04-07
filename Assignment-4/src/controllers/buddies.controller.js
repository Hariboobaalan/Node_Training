const buddyServices = require("../services/buddies.services");
/**
 * CreateBuddy is a function that takes in a request and a response, and sends the request to a function in the buddyServices file with the request body as the argument.
 * @param request - This is the request object that contains the data sent from the client.
 * @param response - The response object is used to send data back to the client.
 */
function createBuddy(request, response) {
  let { code, message, data } = buddyServices.createBuddyService(request.body);
  response.status(code).send({ code: code, message: message });
}

/**
 * It takes a request and a response, and sends the response of the deleteBuddy function in the
 * buddyServices file.
 * @param request - This is the request object that contains the data sent from the client.
 * @param response - The response object is used to send data back to the client.
 */
function deleteBuddy(request, response) {
  let { code, message, data } = buddyServices.deleteBuddyService(
    request.params.buddyId
  );
  response.status(code).send({ code: code, message: message });
}

/**
 * It takes a request and a response, and sends the response of the listAllBuddies function from the
 * buddyServices file
 * @param request - This is the request object that contains the request information.
 * @param response - The response object is used to send data back to the client.
 */
function listAllBuddies(request, response) {
  let { code, message, data } = buddyServices.listAllBuddiesService();
  response.status(code).send({ code: code, message: message, data: data });
}

/**
 * It takes a request and a response, and sends the request parameter (buddyId) to the listBuddy function in listBuddyServices
 * @param request - This is the request object that contains the request information.
 * @param response - The response object is used to send data back to the client.
 */
function listBuddy(request, response) {
  let { code, message, data } = buddyServices.listBuddyService(
    request.params.buddyId
  );
  response.status(code).send({ code: code, message: message, data: data });
}

/**
 * It takes a request and a response, and sends the response of the updateBuddy function in the
 * updateBuddyServices file
 * @param request - This is the request object that contains the data sent from the client.
 * @param response - The response object is used to send data back to the client.
 */
function updateBuddy(request, response) {
  let { code, message, data } = buddyServices.updateBuddyService(
    request.params.buddyId,
    request.body
  );
  response.status(code).send({ code: code, message: message });
}

module.exports = {
  createBuddy,
  listBuddy,
  listAllBuddies,
  updateBuddy,
  deleteBuddy,
};
