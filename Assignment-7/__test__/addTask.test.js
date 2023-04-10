const supertest = require("supertest");
const app = require("../index");
const CODES = require("../src/constants/codes.constants");
const { MESSAGES } = require("../src/constants/messages.constants");
const PAYLOAD = require("./payload");

describe("Add task", () => {
  describe("Given Payload with valid username, accesstoken and task payload", () => {
    it("must return tasks Added", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/tasks/")
        .set({ "x-auth-token": PAYLOAD.JWT_TOKEN })
        .set({ username: PAYLOAD.userPayload.username })
        .send(PAYLOAD.task1);
      expect(statusCode).toBe(CODES.CREATED);
      expect(body).toEqual({ message: MESSAGES.TASK_ADD_SUCCESS });
    });
  });
  describe("Given Payload with valid username, accesstoken and Invalid payload structure", () => {
    it("must return Invalid Payload Structure", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/tasks/")
        .set({ "x-auth-token": PAYLOAD.JWT_TOKEN })
        .set({ username: PAYLOAD.userPayload.username })
        .send(PAYLOAD.taskInvalid);
      expect(statusCode).toBe(CODES.BAD_REQUEST);
      expect(body).toHaveProperty("error");
    });
  });
  describe("Given Payload with valid username, accesstoken and Invalid URL endpoint", () => {
    it("must return no service", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/tasks/random")
        .set({ "x-auth-token": PAYLOAD.JWT_TOKEN })
        .set({ username: PAYLOAD.userPayload.username })
        .send(PAYLOAD.task1);
      expect(statusCode).toBe(CODES.NOT_FOUND);
      expect(body).toHaveProperty("error");
    });
  });
});
