const createBuddyService = require("../services/createBuddy.services");
/**
 * CreateBuddy is a function that takes in a request and a response, and sends the request to a function in the buddyServices file with the request body as the argument.
 * @param request - This is the request object that contains the data sent from the client.
 * @param response - The response object is used to send data back to the client.
 */
module.exports = function createBuddy(request, response) {
  response.send(createBuddyService(request.body));
};
