/* Importing the express module. */
const express = require("express");
/* A middleware that allows cross-origin requests. */
const cors = require("cors");
/* Creating an instance of the express module. */
const app = express();
/* Declaring a constant port. */
require("dotenv").config();
const PORT = process.env.PORT;

/* Importing writeJSON function to write the data to the database */
const { writeJSON } = require("./src/utilities/IO");

const buddiesRoute = require("./src/routes/buddies.routes");

/* This is a middleware that allows cross-origin requests to only http://localhost:4000 address. */
app.use(
  cors({
    origin: ["http://localhost:4000"],
  })
);

/* This is used to read the data from body even if the request is sent using POST method (querystring is empty) */
app.use(express.urlencoded({ extended: false }));

/* This is used to read the request resource as a JSON */
app.use(express.json());

/* This is used to redirect this request to buddiesRoute. */
app.use("/buddies", buddiesRoute);

app.use("/", (request, response) => {
  response.send({ message: "This is the home route" });
});

/* This is a method that is used to start the server and listen at port 4000, also creates a new database during the start of the server.. */
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
  const employeeBuddies = [];
  writeJSON(employeeBuddies);
});
