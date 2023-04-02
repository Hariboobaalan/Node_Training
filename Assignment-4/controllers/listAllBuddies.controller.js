const listAllBuddiesService = require("../services/listAllBuddies.services");
/**
 * It takes a request and a response, and sends the response of the listAllBuddies function from the
 * buddyServices file
 * @param request - This is the request object that contains the request information.
 * @param response - The response object is used to send data back to the client.
 */
module.exports = function listAllBuddies(request, response) {
  response.send(listAllBuddiesService());
};
