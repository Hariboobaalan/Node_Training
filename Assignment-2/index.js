/* Importing the http module from the Node.js core library. */
let http = require("http");
/* Importing the module `generateRandomColors` from the file `generateRandomColors.js` */
let randomizedColorCodes = require("./generateRandomColors");

/* Creating a server and listening to the port 4000 and send response on each request. */
http
  .createServer(function (request, response, error) {
    if (error) {
      console.log("Service Error");
    }
    let responseObject = randomizedColorCodes.generateRandomColors();
    if (responseObject.status == 1) {
      /* Converting the array of objects into a JSON string. */
      responseObject.response = JSON.stringify(responseObject.outputArray);
    }

    /* Writing the response to the client. */
    response.write(responseObject.response);
    response.end();
  })
  .listen(4002);
