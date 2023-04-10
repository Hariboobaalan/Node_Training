const supertest = require("supertest");
const app = require("../index");
const CODES = require("../src/constants/codes.constants");
const { MESSAGES } = require("../src/constants/messages.constants");
const PAYLOAD = require("./payload");

describe("User login", () => {
  describe("Given Payload with Valid username and password", () => {
    it("must return the access token", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/users/login")
        .send(PAYLOAD.userPayload);
      expect(statusCode).toBe(CODES.OK);
      expect(body).toHaveProperty("token");
    });
  });
  describe("Given Payload with Valid username and Invalid password", () => {
    it("must return INVALID password", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/users/login")
        .send(PAYLOAD.userPayloadWrongPassword);
      expect(statusCode).toBe(CODES.FORBIDDEN);
      expect(body).toEqual({ message: MESSAGES.INVALID_PASSWORD });
    });
  });
  describe("Given Payload with NON Existing username and password", () => {
    it("must return USER NOT FOUND", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/users/login")
        .send(PAYLOAD.userPayloadNew);
      expect(statusCode).toBe(CODES.NOT_FOUND);
      expect(body).toEqual({ message: MESSAGES.USER_NOT_FOUND });
    });
  });
  describe("Given Payload with Invalid Payload Structure", () => {
    it("must return INVALID Payload Structure", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/users/login")
        .send(PAYLOAD.userPayloadInvalid);
      expect(statusCode).toBe(CODES.BAD_REQUEST);
      expect(body).toHaveProperty("error");
    });
  });
});
