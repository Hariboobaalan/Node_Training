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
        `<div style='background-color:${colorObject.code.hex};'>` +
          JSON.stringify(colorObject) +
          "</div>"
      );
    });

    response.end();
  })
  .listen(4000);
