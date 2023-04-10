require("dotenv").config();
// Importing the required modules
const { read, write } = require("../utils/io.util");
const filterSortUtil = require("../utils/pageFilterSort.util");
const TASKS_DATABASE_URL = process.env.TASKS_DATABASE_URL;
const CODES = require("../constants/codes.constants");
const { MESSAGES } = require("../constants/messages.constants");
const createLog = require("../utils/createlog.util");

/**
 * The function adds a task to a user's task list in a database and returns a success message or an
 * error message if the task ID already exists.
 * @param username - The username is a string that represents the user for whom the task is being
 * added.
 * @param data - The `data` parameter is an object that represents a task to be added to the tasks
 * database. It should have the following properties:
 * @returns an object with a `status` property and a `data` property. The `status` property indicates
 * the status code of the response, and the `data` property contains a message or data related to the
 * response. The function returns different objects depending on the conditions met in the code. If the
 * task is added successfully, the function returns an object with a `status` property set
 */
const addTaskService = (username, data) => {
  let tasks = read(TASKS_DATABASE_URL);
  if (tasks.status === CODES.INTERNAL_SERVER_ERROR) {
    return tasks;
  }
  if (tasks.data[username] === undefined) {
    tasks.data[username] = [data];
  } else {
    if (!tasks.data[username].some((task) => task.taskID == data.taskID)) {
      tasks.data[username].push(data);
    } else return { status: CODES.FORBIDDEN, data: MESSAGES.TASK_ID_EXISTS };
  }
  let responseObject = write(TASKS_DATABASE_URL, tasks.data);

  if (responseObject.status === CODES.OK)
    return { status: CODES.CREATED, data: MESSAGES.TASK_ADD_SUCCESS };
  return responseObject;
};

/**
 * The function reads all tasks for a given username, filters and sorts them based on a query, and
 * formats the timestamps of task comments.
 * @param username - The username parameter is a string that represents the name of the user whose
 * tasks are being read.
 * @param query - The `query` parameter is an object that contains filters and sorting options to be
 * applied to the tasks data. It is passed to the `filterSortUtil` function to filter and sort the
 * tasks data before returning it.
 * @returns an object with two properties: "status" and "data". The "status" property contains a status
 * code indicating the success or failure of the function, and the "data" property contains an array of
 * task objects that match the query parameters. If there are no matching tasks, an empty array will be
 * returned.
 */
const readAllTasksService = (username, query) => {
  let tasks = read(TASKS_DATABASE_URL);
  let responseObject = filterSortUtil(tasks.data[username], query);
  if (responseObject.status === CODES.INTERNAL_SERVER_ERROR)
    return responseObject;
  if (
    responseObject.status != CODES.NOT_FOUND &&
    responseObject.data.length != 0
  ) {
    responseObject.data.map((task) => {
      task.taskComments.map((comment) => {
        comment.timestamp = new Date(
          Number(comment.timestamp)
        ).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      });
    });
  }
  return { status: responseObject.status, data: responseObject.data };
};

/**
 * The function reads a task from a database and formats its comments' timestamps.
 * @param username - The username is a string parameter that represents the name of the user whose task
 * is being read.
 * @param taskID - taskID is a unique identifier for a specific task in the tasks database. It is used
 * to retrieve information about a specific task when calling the readTaskService function.
 * @returns The function `readTaskService` returns an object with a `status` property and a `data`
 * property. The `status` property indicates the status of the response, and the `data` property
 * contains the data associated with the response.
 */
const readTaskService = (username, taskID) => {
  let tasks = read(TASKS_DATABASE_URL);
  if (tasks.status === CODES.INTERNAL_SERVER_ERROR) {
    return tasks;
  }
  let task =
    (tasks.data[username] !== undefined &&
      tasks.data[username].find(
        (task) => Number(task.taskID) == Number(taskID)
      )) ||
    [];
  if (task.length === 0)
    return { status: CODES.NOT_FOUND, data: MESSAGES.TASK_NOT_FOUND };
  if (task.taskComments.length != 0) {
    task.taskComments.map((comment) => {
      comment.timestamp = new Date(
        Number(comment.timestamp)
      ).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    });
  }
  return { status: CODES.OK, data: task };
};

/**
 * This function updates a task in a database for a specific user, with certain restrictions on which
 * fields can be modified.
 * @param username - The username of the user whose task is being updated.
 * @param taskID - taskID is a unique identifier for a specific task in the task list. It is used to
 * locate and update the task with the new data provided.
 * @param newData - `newData` is an object containing the updated data for a specific task. The keys of
 * the object represent the fields to be updated, and the values represent the new values for those
 * fields.
 * @returns an object with a `status` property and a `data` property. The `status` property indicates
 * the status of the operation (e.g. `CODES.OK` for success, `CODES.INTERNAL_SERVER_ERROR` for server
 * error, `CODES.NOT_FOUND` for task not found, `CODES.FORBIDDEN` for update failure due to attempting
 * to modify a non
 */
const updateTaskService = (username, taskID, newData) => {
  let tasks = read(TASKS_DATABASE_URL);
  if (tasks.status === CODES.INTERNAL_SERVER_ERROR) {
    return tasks;
  }
  if (tasks.data[username] !== undefined) {
    let taskIndex = tasks.data[username].findIndex(
      (task) => Number(task.taskID) === Number(taskID)
    );

    if (taskIndex != -1) {
      let isModifiable = true;
      const shouldNotModify = ["taskID"];
      for (let key in Object(newData)) {
        if (shouldNotModify.includes(key)) {
          isModifiable = false;
          break;
        } else {
          tasks.data[username][taskIndex][key] = newData[key];
        }
      }
      if (isModifiable === false) {
        return { status: CODES.FORBIDDEN, data: MESSAGES.UPDATE_FAIL };
      }
      let responseObject = write(TASKS_DATABASE_URL, tasks.data);
      if (responseObject.status === CODES.OK)
        return { status: CODES.OK, data: MESSAGES.UPDATE_SUCCESS };
      return responseObject;
    }
  }
  return { status: CODES.NOT_FOUND, data: MESSAGES.TASK_NOT_FOUND };
};

/**
 * This function deletes a task from a user's list of tasks in a database.
 * @param username - The username of the user whose task is to be deleted.
 * @param taskID - taskID is a unique identifier for a task that needs to be deleted from the tasks
 * database.
 * @returns The function may return an object with a `status` property and a `data` property. The
 * `status` property may have a value of `CODES.OK` if the task was successfully deleted, or
 * `CODES.NOT_FOUND` if the task was not found. The `data` property may have a value of
 * `MESSAGES.DELETE_SUCCESS` if the task was successfully deleted, or `
 */
const deleteTaskService = (username, taskID) => {
  let tasks = read(TASKS_DATABASE_URL);
  if (tasks.status === CODES.INTERNAL_SERVER_ERROR) {
    return tasks;
  }
  if (tasks.data[username] !== undefined) {
    let intialTasksLength = tasks.data[username].length;

    userTasks = tasks.data[username].filter(
      (task) => Number(task.taskID) !== Number(taskID)
    );

    if (intialTasksLength !== userTasks.length) {
      tasks.data[username] = userTasks;
      let responseObject = write(TASKS_DATABASE_URL, tasks.data);
      if (responseObject.status === CODES.OK)
        return { status: CODES.OK, data: MESSAGES.DELETE_SUCCESS };
      return responseObject;
    }
    return { status: CODES.NOT_FOUND, data: MESSAGES.TASK_NOT_FOUND };
  }
};

module.exports = {
  addTaskService,
  readAllTasksService,
  readTaskService,
  updateTaskService,
  deleteTaskService,
};
