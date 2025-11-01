// __tests__/verifyToken.test.js
const verifyToken = require("../../middlewares/verifyToken");
const jwt = require("jsonwebtoken");
const pool = require("../../db/pool");

jest.mock("jsonwebtoken");
jest.mock("../../db/pool");

describe("verifyToken middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { cookies: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
    // Silence expected errors logged by the middleware during negative tests
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore any spies/mocks created on globals like console
    jest.restoreAllMocks();
  });

  test("should return 401 if no token is provided", async () => {
    await verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "No token provided",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("should return 401 if token is invalid", async () => {
    req.cookies.token = "invalidtoken";
    jwt.verify.mockImplementation(() => {
      throw new Error("invalid token");
    });

    await verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid or expired token",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("should return 404 if user not found", async () => {
    req.cookies.token = "validtoken";
    jwt.verify.mockReturnValue({ user_id: 123 });
    pool.query.mockResolvedValue({ rows: [] });

    await verifyToken(req, res, next);

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT user_id, email, username, role FROM users WHERE user_id = $1",
      [123]
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "User not found",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("should attach user to req and call next if token is valid", async () => {
    req.cookies.token = "validtoken";
    const user = {
      user_id: 123,
      email: "a@b.com",
      username: "user",
      role: "employee",
    };
    jwt.verify.mockReturnValue({ user_id: 123 });
    pool.query.mockResolvedValue({ rows: [user] });

    await verifyToken(req, res, next);

    expect(req.user).toEqual(user);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
