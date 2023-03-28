// getting the required modules
let fs = require("fs");

// reading the json file and storing the json in colorCodes
let colorCodes = JSON.parse(fs.readFileSync("color_ palette.json", "UTF-8"));
let length = colorCodes.length;

// output array to store the resultant color codes
let output = [];

// loop to generate 5 random numbers and push unique color codes to output array
let iterationVariable = 5;
while (iterationVariable > 0) {
  let index = Math.floor(Math.random() * length);
  if (!output.some((color) => color.color == colorCodes[index].color)) {
    output.push(colorCodes[index]);
    iterationVariable--;
  }
}

// writeFile to write the stringified output to the destination file
fs.writeFileSync(
  "randomized_color_palette.json",
  JSON.stringify(output),
  "utf-8"
);

// read the newly generated randomized_color_palette json file
let randomizedColorCodes = JSON.parse(
  fs.readFileSync("randomized_color_palette.json", "UTF-8")
);

// display the color of each object in the newly generated randomized_color_palette json file
randomizedColorCodes.forEach((colorObject) => {
  console.log("Color Name = " + colorObject.color);
});
