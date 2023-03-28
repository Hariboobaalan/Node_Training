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

fs.writeFileSync(
  "randomized_color_palette.json",
  JSON.stringify(output),
  "utf-8"
);

let randomizedColorCodes = JSON.parse(
  fs.readFileSync("randomized_color_palette.json", "UTF-8")
);
randomizedColorCodes.forEach((colorObject) => {
  console.log("Color Name = " + colorObject.color);
});
