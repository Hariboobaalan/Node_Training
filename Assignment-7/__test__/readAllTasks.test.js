const supertest = require("supertest");
const app = require("../index");
const CODES = require("../src/constants/codes.constants");
const PAYLOAD = require("./payload");

describe("Read Task by ID", () => {
  describe("Given Read request for All Tasks of a User", () => {
    it("must return all tasks", async () => {
      const { statusCode, body } = await supertest(app)
        .get(`/tasks/`)
        .set({ "x-auth-token": PAYLOAD.JWT_TOKEN })
        .set({ username: PAYLOAD.userPayload.username })
        .send();
      expect(statusCode).toBe(CODES.OK);
    });
  });
});
