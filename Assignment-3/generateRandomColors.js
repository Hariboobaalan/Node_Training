var randomExt = require("random-ext");
exports.generateRandomColors = () => {
  let fs = require("fs");
  let colorCodes = JSON.parse(fs.readFileSync("color_ palette.json", "UTF-8"));
  let randomIntegerArray = randomExt.integerArray(5, colorCodes.length - 1, 0);
  let randomizedColorArray = randomIntegerArray.map((index) => {
    return colorCodes[index];
  });
  return randomizedColorArray;
};
