const { addEvent } = require("../../controllers/addEvent");
const pool = require("../../db/pool");
const crypto = require("crypto");

jest.mock("../../db/pool", () => ({
  query: jest.fn(),
}));

jest.mock("crypto", () => ({
  randomInt: jest.fn(),
}));

describe("add event controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        title: "Sample Event",
        description: "Event Description",
        city: "Sample City",
        municipality: "Sample Municipality",
        participants: { user_id: "12345" },
        year: "2025",
        month: "11",
        day: "12",
        attachment_url: "https://example.com/file.pdf",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

   
    jest.clearAllMocks();
  });

  test("should add an event successfully", async () => {
    // Arrange
    const fakeEventId = 1234567890;
    crypto.randomInt.mockReturnValue(fakeEventId);
    pool.query.mockResolvedValue({ rows: [{ event_id: fakeEventId }] });

    // Act
    await addEvent(req, res);

    // Assert
    expect(crypto.randomInt).toHaveBeenCalledWith(1000000000, 9999999999);

    const expectedDate = "2025-11-12";
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO events"),
      expect.arrayContaining([
        fakeEventId,
        "Sample Event",
        "Event Description",
        "Sample City",
        "Sample Municipality",
        "12345",
        expectedDate,
        "https://example.com/file.pdf",
      ])
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Event added successfully",
      event_id: fakeEventId,
    });
  });

  test("should handle database errors", async () => {
    // Arrange
    const error = new Error("DB error");
    crypto.randomInt.mockReturnValue(9876543210);
    pool.query.mockRejectedValue(error);

    // Act
    await addEvent(req, res);

    // Assert
    expect(pool.query).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to add event",
    });
  });
});
