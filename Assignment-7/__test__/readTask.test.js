const supertest = require("supertest");
const app = require("../index");
const CODES = require("../src/constants/codes.constants");
const PAYLOAD = require("./payload");

describe("Read Task by ID", () => {
  describe("Given Read request for a task with Existing task ID", () => {
    it("must return the task details", async () => {
      const { statusCode, body } = await supertest(app)
        .get(`/tasks/${PAYLOAD.readTaskIDExists}`)
        .set({ "x-auth-token": PAYLOAD.JWT_TOKEN })
        .set({ username: PAYLOAD.userPayload.username })
        .send();
      expect(statusCode).toBe(CODES.OK);
    });
  });
  describe("Given read request for Non-Existing task ID", () => {
    it("must return No Task Found", async () => {
      const { statusCode, body } = await supertest(app)
        .get(`/tasks/${PAYLOAD.readTaskIDNotExists}`)
        .set({ "x-auth-token": PAYLOAD.JWT_TOKEN })
        .set({ username: PAYLOAD.userPayload.username })
        .send();
      expect(statusCode).toBe(CODES.NOT_FOUND);
    });
  });
});
