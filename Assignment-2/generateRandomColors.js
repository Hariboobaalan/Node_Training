/* Exporting a function that generates random unique colors. */
export function generateRandomColors() {
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
    if (length <= 4) {
      throw new Error("Less Data in Database");
    }
    let iterationVariable = 5;

    /* This is a while loop that is used to generate random colors. */
    while (iterationVariable > 0) {
      let index = Math.floor(Math.random() * length);
      if (
        !responseObject.outputArray.some(
          (color) => color.color == colorCodes[index].color
        )
      ) {
        responseObject.outputArray.push(colorCodes[index]);
        iterationVariable--;
      }
    }
  } catch (error) {
    responseObject.status = 0;
    responseObject.response = error.toString();
  }
  return responseObject;
}
