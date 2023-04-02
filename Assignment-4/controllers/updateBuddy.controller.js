const updateBuddyService = require("../services/updateBuddy.services");
/**
 * It takes a request and a response, and sends the response of the updateBuddy function in the
 * updateBuddyServices file
 * @param request - This is the request object that contains the data sent from the client.
 * @param response - The response object is used to send data back to the client.
 */
module.exports = function updateBuddy(request, response) {
  response.send(updateBuddyService(request.params.uid, request.body));
};
