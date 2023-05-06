const PAYLOAD = {
  JWT_TOKEN:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcmkiLCJpYXQiOjE2ODExMzY1OTMsImV4cCI6MTY4MTIyMjk5M30.eXrP4bFmQWYXl__XNd0hifT0GQCVgsgXJ8htFunV8Wg",
  userPayload: {
    username: "hari",
    password: "helloworld",
  },
  userPayloadInvalid: {
    username: "hari",
  },
  userPayloadWrongPassword: {
    username: "hari",
    password: "helloguys",
  },
  userPayloadNew: {
    username: "abcd",
    password: "mypassword",
  },
  task1: {
    taskID: 1,
    title: "HelloWorld",
    description: "Lorem Ipsum",
    dueDate: "12/12/2005",
    priority: 5,
    taskComments: [
      {
        comment: "My Comment 1",
        timestamp: "1681100803504",
      },
      {
        comment: "My Comment 2",
        timestamp: "1681100803504",
      },
    ],
  },
  taskInvalid: {
    description: "Harry Potter",
    priority: 1,
    dueDate: "12/02/2022",
    taskComments: [
      { comment: "lorem", timestamp: "12/02/2022" },
      { comment: "ipsum", timestamp: "12/02/2022" },
    ],
  },
  readTaskIDExists: 1,
  readTaskIDNotExists: 1000,
  noTaskUser: {
    username: "notaskuser",
    password: "helloworld",
  },
  updateTaskPayloadValidID: 1,
  updateTaskPayloadInvalidID: 463,
  updateTaskPayloadValid: {
    title: "Harry Potter",
    description: "Prisoner of Azkaban",
  },
  updateTaskPayloadInvalid: {
    taskID: 5,
    title: "Harry Potter",
    description: "Prisoner of Azkaban",
  },
  deleteTaskValidID: 1,
  deleteTaskInvalidID: 785,
};
module.exports = PAYLOAD;
