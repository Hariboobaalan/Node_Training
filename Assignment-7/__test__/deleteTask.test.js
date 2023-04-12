const supertest = require("supertest");
const app = require("../index");
const CODES = require("../src/constants/codes.constants");
const { MESSAGES } = require("../src/constants/messages.constants");
const PAYLOAD = require("./payload");

describe("Delete Task", () => {
  describe("Given Valid Task ID", () => {
    it("must update tasks and return success message", async () => {
      const { statusCode, body } = await supertest(app)
        .delete(`/tasks/${PAYLOAD.deleteTaskValidID}`)
        .set({ Authorization: PAYLOAD.JWT_TOKEN })
        .set({ username: PAYLOAD.userPayload.username })
        .send();
      expect(statusCode).toBe(CODES.OK);
      expect(body).toEqual({ message: MESSAGES.DELETE_SUCCESS });
    });
  });
  describe("Given Invalid Task ID", () => {
    it("must return No Task Found", async () => {
      const { statusCode, body } = await supertest(app)
        .delete(`/tasks/${PAYLOAD.deleteTaskInvalidID}`)
        .set({ Authorization: PAYLOAD.JWT_TOKEN })
        .set({ username: PAYLOAD.userPayload.username })
        .send();
      expect(statusCode).toBe(CODES.NOT_FOUND);
      expect(body).toEqual({ message: MESSAGES.TASK_NOT_FOUND });
    });
  });
});
