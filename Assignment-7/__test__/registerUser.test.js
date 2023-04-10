const supertest = require("supertest");
const app = require("../index");
const CODES = require("../src/constants/codes.constants");
const { MESSAGES } = require("../src/constants/messages.constants");
const PAYLOAD = require("./payload");

describe("User Registration", () => {
  describe("Given Payload with Valid Username and Password", () => {
    it("must return the payload with token", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/users/register")
        .send(PAYLOAD.userPayload);
      console.log("My Data is ", PAYLOAD.userPayload);
      expect(statusCode).toBe(CODES.OK);
      expect(body).toHaveProperty("token");
    });
  });

  describe("Given INVALID Payload Structure", () => {
    it("must return Invalid Payload Structure", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/users/register")
        .send(PAYLOAD.userPayloadInvalid);
      expect(statusCode).toBe(CODES.BAD_REQUEST);
      expect(body).toHaveProperty("error");
    });
  });

  describe("Given Payload with Already existing username", () => {
    it("must return User Already Exists", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/users/register")
        .send(PAYLOAD.userPayload);
      expect(statusCode).toBe(CODES.FORBIDDEN);
      expect(body).toEqual({ message: MESSAGES.USER_ALREADY_EXISTS });
    });
  });
});
