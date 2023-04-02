const listBuddyService = require("../services/listBuddy.services");
/**
 * It takes a request and a response, and sends the request parameter (UID) to the listBuddy function in listBuddyServices
 * @param request - This is the request object that contains the request information.
 * @param response - The response object is used to send data back to the client.
 */
module.exports = function listBuddy(request, response) {
  response.send(listBuddyService(request.params.uid));
};
