const pool = require("../../db/pool");
const userService = require("../../services/userService");

jest.mock("../../db/pool");

describe("userService.findUserByEmail", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return user data when a user is found", async () => {
    const mockUser = { id: 1, email: "test@example.com", name: "John Doe" };
    pool.query.mockResolvedValueOnce({ rows: [mockUser] });

    const result = await userService.findUserByEmail("test@example.com");

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE email = $1",
      ["test@example.com"]
    );
    expect(result).toEqual(mockUser);
  });

  it("should return undefined when no user is found", async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const result = await userService.findUserByEmail("unknown@example.com");

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE email = $1",
      ["unknown@example.com"]
    );
    expect(result).toBeUndefined();
  });

  it("should throw an error if the query fails", async () => {
    pool.query.mockRejectedValueOnce(new Error("DB error"));

    await expect(
      userService.findUserByEmail("error@example.com")
    ).rejects.toThrow("DB error");
  });
});
