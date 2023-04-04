/* Importing the file system module. */
const fs = require("fs");
/* Importing the express module. */
const express = require("express");
/* A middleware that allows cross-origin requests. */
const cors = require("cors");
/* Creating an instance of the express module. */
const app = express();
/* Declaring a constant variable named port and assigning it the value of 4000. */
const port = 4000;
/* Declaring a global variable named database and assigning it the value of the path of the file where
the data will be stored. */
global.database = "./database/cdw_ace23_buddies.json";

const buddyRoute = require("./routes/buddy.routes");

/* This is a middleware that allows cross-origin requests to only http://localhost:4000 address. */
app.use(
  cors({
    origin: ["http://localhost:4000"],
  })
);

// This is used to read the data from body even if the request is sent using POST method (querystring is empty)
app.use(express.urlencoded({ extended: false }));

// This is used to read the request resource as a JSON
app.use(express.json());

app.use("/buddy", buddyRoute);

app.use("/", (request, response) => {
  response.send("Home Route");
});

/* This is a method that is used to start the server and listen at port 4000, also creates a new database during the start of the server.. */
app.listen(port, () => {
  console.log("Server started at port:" + port);
  let employeeBuddies = [];
  fs.writeFileSync(database, JSON.stringify(employeeBuddies));
});
