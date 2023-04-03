let http = require("http");
let randomizedColorCodes = require("./generateRandomColors");
http
  .createServer(function (request, response, error) {
    if (error) {
      console.log("Error");
    }

    let responseObject = randomizedColorCodes.generateRandomColors();
    if (responseObject.status == 1) {
      responseObject.response = JSON.stringify(responseObject.outputArray);
    }

    /* Writing the response to the client. */
    response.write(responseObject.response);
    response.end();
  })
  .listen(4001);
