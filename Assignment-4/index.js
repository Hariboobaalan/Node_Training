const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
global.database = "assets/store/cdw_ace23_buddies.json";

const buddyRoute = require("./routes/buddy.routes");

app.use(
  cors({
    origin: ["http://localhost:4000"],
  })
);
app.use(express.urlencoded({ extended: false })); // This is used to read the data from body even if the request is sent using POST method (querystring is empty)

app.use(express.json()); // This is used to read the request resource as a JSON

app.use("/buddy", buddyRoute);

app.use("/", (request, response) => {
  response.send("Home Route");
});

app.listen(port, () => {
  console.log("Server started at port:" + port);
  let employeeBuddies = [];
  fs.writeFileSync(database, JSON.stringify(employeeBuddies));
});
