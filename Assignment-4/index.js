let createRoute = require("./routes/create");
let readRoute = require("./routes/read");
let updateRoute = require("./routes/update");
let deleteRoute = require("./routes/delete");
let fs = require("fs");
let express = require("express");
let cors = require("cors");
global.database = "assets/store/cdw_ace23_buddies.json";

let app = express();
let port = 4000;
app.use(
  cors({
    origin: ["http://localhost:4000"],
  })
);
app.use(express.urlencoded({ extended: false })); // This is used to read the data from body even if the request is sent using POST method (querystring is empty)

app.use(express.json()); // This is used to read the request resource as a JSON

app.use("/addBuddy", createRoute);

app.use("/listBuddy", readRoute);

app.use("/listAllBuddies", readRoute);

app.use("/updateBuddy/", updateRoute);

app.use("/deleteBuddy", deleteRoute);

app.use("/", (request, response) => {
  response.send("Base Route");
});

app.listen(port, () => {
  console.log("Server started at port:" + port);
  let employeeBuddies = [];
  fs.writeFileSync(database, JSON.stringify(employeeBuddies));
});
