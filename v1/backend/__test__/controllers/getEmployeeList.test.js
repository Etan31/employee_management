const { getEmployeeList } = require("../../controllers/getEmployeeList");
const pool = require("../../db/pool");

jest.mock("../../db/pool", () => ({ query: jest.fn() }));

describe("getEmployeeList", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should return employee list on success", async () => {
    const mockRows = [{ user_id: 1, username: "John" }];
    pool.query.mockResolvedValueOnce({ rows: mockRows });

    await getEmployeeList(req, res);

    expect(pool.query).toHaveBeenCalledWith(expect.stringContaining("SELECT"));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockRows);
  });

  it("should return 500 if query throws an error", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    pool.query.mockRejectedValueOnce(new Error("DB error"));
    await getEmployeeList(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch manager list",
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error getting employee list:",
      expect.any(Error)
    );

    consoleSpy.mockRestore(); // restore console.error
  });
});
