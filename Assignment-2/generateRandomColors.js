exports.generateRandomColors = () => {
  let fs = require("fs");
  let colorCodes = JSON.parse(fs.readFileSync("color_ palette.json", "UTF-8"));
  let length = colorCodes.length;
  let output = [];
  let colorIndex = [];
  for (let i = 0; i < 5; i++) {
    let index = Math.floor(Math.random() * length);
    if (colorIndex.indexOf(index) == -1) {
      output.push(colorCodes[index]);
      colorIndex.push(index);
    }
  }

  return output;
};
