/* Importing the express module. */
const express = require("express");
/* A middleware that allows cross-origin requests. */
const cors = require("cors");
/* Creating an instance of the express module. */
const app = express();
/* Declaring a constant port. */
require("dotenv").config();
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const BAD_REQUEST = require("./src/constants/codes.constants").BAD_REQUEST;

const {
  HOME_ROUTE,
  INVALID_URL,
} = require("./src/constants/messages.constants");
/* Importing writeJSON function to write the data to the database */
const { writeJSON } = require("./src/utils/io.utils");

const buddiesRoute = require("./src/routes/buddies.routes");

/* This is a middleware that allows cross-origin requests to only http://localhost:4000 address. */
app.use(
  cors({
    origin: [`${HOST}:${PORT}`],
  })
);

/* This is used to read the data from body even if the request is sent using POST method (querystring is empty) */
app.use(express.urlencoded({ extended: false }));

/* This is used to read the request resource as a JSON */
app.use(express.json());

/* This is used to redirect this request to buddiesRoute. */

app.use("/buddies", buddiesRoute);

app.all("/", (request, response) => {
  response.send({ message: HOME_ROUTE });
});

app.all(/^\/(.+)/, (request, response) => {
  response.status(BAD_REQUEST).send({ error: INVALID_URL });
});

/* This is a method that is used to start the server and listen at port 4000, also creates a new database during the start of the server.. */
app.listen(PORT, () => {
  const employeeBuddies = [];
  writeJSON(employeeBuddies);
});
