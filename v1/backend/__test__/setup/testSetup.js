// v1/backend/__test__/setup/testSetup.js

// Silence noisy console output during tests (dotenv logs and other non-error logs)
// Keep console.error unmocked so real errors still surface in test output.
jest.spyOn(console, "log").mockImplementation(() => {});
jest.spyOn(console, "warn").mockImplementation(() => {});

// Load environment variables if needed (now that console is silenced)
require("dotenv").config();

// Example: mock DB connection (so you don't hit the real one)
jest.mock("./../../db/pool", () => ({
  query: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  // Restore original implementations
  if (console.log && console.log.mockRestore) console.log.mockRestore();
  if (console.warn && console.warn.mockRestore) console.warn.mockRestore();
});
