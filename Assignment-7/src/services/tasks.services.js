require("dotenv").config();
// Importing the required modules
const { read, write } = require("../utils/io.util");
const filterSortUtil = require("../utils/pageFilterSort.util");
const CODES = require("../constants/codes.constants");
const { MESSAGES } = require("../constants/messages.constants");
const TASKS_DATABASE_URL = process.env.TASKS_DATABASE_URL;

// Service Function to check whether task already exists or not and add the task to taskList.
// Else return Task ID already Exists
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

// Service Function to Read All the tasks in the tasklist of the requesting user
// If No tasks are available, it returns No Tasks Found
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

// Service Function to read the Task by ID specified by the requesting user.
// If the specified task does not exists, it returns Task Not Found
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

// Service Function to update the Task by ID specified by the requesting user.
// If the specified task does not exists, it returns Task Not Found
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

// Service Function to delete the Task by ID specified by the requesting user.
// If the specified task does not exists, it returns Task Not Found
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
