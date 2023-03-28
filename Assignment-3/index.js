let http = require("http");
let randomizedColorCodes = require("./generateRandomColors");
http
  .createServer(function (request, response, error) {
    if (error) {
      console.log("Error");
    }
    let outputColors = randomizedColorCodes.generateRandomColors();
    outputColors.forEach((colorObject) => {
      response.write(
        `<h1 style='color:${colorObject.code.hex};background-color:#000;text-align:center'>` +
          JSON.stringify(colorObject) +
          "</h1>"
      );
    });

    response.end();
  })
  .listen(4000);
