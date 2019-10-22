const request = require("supertest");
const { User } = require("../../models/user");
const { Genre } = require("../../models/genres");
let server;

describe("Auth middleware", () => {
  beforeEach(() => {
    server = require("../../app");
  });
  afterEach(async () => {
    await Genre.remove({});
  });

  beforeEach(() => {
    token = new User().generateAuthToken();
  });
  let token;
  const exec = () => {
    return request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: name });
  };

  it("should return 401 if no token is present", async () => {
    token = "";
    const res = await exec();

    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "a";
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 200 if token is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});
