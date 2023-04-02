const deleteBuddyService = require("../services/deleteBuddy.services");
/**
 * It takes a request and a response, and sends the response of the deleteBuddy function in the
 * buddyServices file.
 * @param request - This is the request object that contains the data sent from the client.
 * @param response - The response object is used to send data back to the client.
 */
module.exports = function deleteBuddy(request, response) {
  response.send(deleteBuddyService(request.params.uid));
};
