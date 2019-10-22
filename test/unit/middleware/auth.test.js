const { User } = require("../../../models/user");
const auth = require("../../../middleware/auth");

describe("auth middle", () => {
  it("should populate req.user with payload of valid JWT", () => {
    const token = new User().generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token)
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toBeDefined();
  });
});
