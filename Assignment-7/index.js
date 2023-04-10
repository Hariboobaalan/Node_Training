/* Importing the express module. */
const express = require("express");
/* A middleware that allows cross-origin requests. */
const cors = require("cors");
/* Importing the filesystem module*/
const fs = require("fs");
/* Creating an instance of the express module. */
const app = express();
/* Declaring a constant port. */
require("dotenv").config();
const PORT = process.env.PORT;
const {
  MESSAGES,
  ERRORS,
} = require("./src/constants/messages.constants");
const CODES = require("./src/constants/codes.constants");
/* Importing write function to write the data to the database */
const { write } = require("./src/utils/io.util");

/* Importing infoLogger to log information. */
const { infoLogger } = require("./src/utils/logger.util");
const auth = require("./src/middleware/auth.middleware");
const tasksRoute = require("./src/routes/tasks.routes");
const usersRoute = require("./src/routes/users.routes");
/* This is a middleware that allows cross-origin requests to only http://localhost:4000 address. */
app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
  })
);

/* This is used to read the data from body even if the request is sent using POST method (querystring is empty) */
app.use(express.urlencoded({ extended: false }));

/* This is used to read the request resource as a JSON */
app.use(express.json());

app.use("/tasks", auth, tasksRoute);
app.use("/users", usersRoute);

app.all("/", (request, response) => {
  response.status(CODES.OK).send({ message: MESSAGES.HOME_ROUTE });
});

app.all(/^\/(.+)/, (request, response) => {
  response
    .status(CODES.INTERNAL_SERVER_ERROR)
    .send({ error: ERRORS.INVALID_URL });
});

/* This is a method that is used to start the server and listen at port 4000, also creates a new database during the start of the server.. */
app.listen(PORT, () => {
  infoLogger.info(`Server started at port: ${PORT}`);
  const tasks = {};
  const users = [];
  if (!fs.existsSync(process.env.TASKS_DATABASE))
    write(process.env.TASKS_DATABASE, tasks);

  if (!fs.existsSync(process.env.USERS_DATABASE))
    write(process.env.USERS_DATABASE, users);
});
