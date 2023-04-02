var randomExt = require("random-ext");
exports.generateRandomColors = () => {
  let fs = require("fs");
 /* Creating an response object with three properties. */
  let responseObject = {
    status: 1,
    response: "",
    outputArray: [],
  };

  let colorCodes;
  try {
    /* Reading the file and converting it into a JSON object. */
    colorCodes = JSON.parse(fs.readFileSync("color_ palette.json", "UTF-8"));
    let length = colorCodes.length;
    if (length == 0) {
      /* Throwing an error if the file is empty. */
      throw new Error("No Data in File");
    }
    responseObject.outputArray = randomExt
      .integerArray(5, colorCodes.length - 1, 0)
      .map((index) => {
        return colorCodes[index];
      });
  } catch (error) {
    responseObject.status = 0;
    responseObject.response = error.toString();
  }
  return responseObject;
};
