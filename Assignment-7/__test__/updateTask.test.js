const supertest = require("supertest");
const app = require("../index");
const CODES = require("../src/constants/codes.constants");
const { MESSAGES } = require("../src/constants/messages.constants");
const PAYLOAD = require("./payload");

describe("Update Task", () => {
  describe("Given Non-Existing Task ID", () => {
    it("must return No Task Found", async () => {
      const { statusCode, body } = await supertest(app)
        .put(`/tasks/${PAYLOAD.updateTaskPayloadInvalidID}`)
        .set({ Authorization: PAYLOAD.JWT_TOKEN })
        .set({ username: PAYLOAD.userPayload.username })
        .send(PAYLOAD.updateTaskPayloadValid);
      expect(statusCode).toBe(404);
      expect(body).toEqual({ message: MESSAGES.TASK_NOT_FOUND });
    });
  });
  describe("Given Valid Existing Task ID", () => {
    it("must update the task and return it", async () => {
      const { statusCode, body } = await supertest(app)
        .put(`/tasks/${PAYLOAD.updateTaskPayloadValidID}`)
        .set({ Authorization: PAYLOAD.JWT_TOKEN })
        .set({ username: PAYLOAD.userPayload.username })
        .send(PAYLOAD.updateTaskPayloadValid);
      expect(statusCode).toBe(CODES.OK);
      expect(body).toEqual({ message: MESSAGES.UPDATE_SUCCESS });
    });
  });
  describe("Given Invalid ", () => {
    it("must return Invalid Payload Structure", async () => {
      const { statusCode, body } = await supertest(app)
        .put(`/tasks/${PAYLOAD.updateTaskPayloadValidID}`)
        .set({ Authorization: PAYLOAD.JWT_TOKEN })
        .set({ username: PAYLOAD.userPayload.username })
        .send(PAYLOAD.updateTaskPayloadInvalid);
      expect(statusCode).toBe(CODES.BAD_REQUEST);
      expect(body).toHaveProperty("error");
    });
  });
});
