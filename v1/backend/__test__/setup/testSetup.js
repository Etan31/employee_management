// v1/backend/__test__/setup/testSetup.js

// Load environment variables if needed
require("dotenv").config();

// Example: mock DB connection (so you don't hit the real one)
jest.mock("./../../db/pool", () => ({
  query: jest.fn(),
}));


beforeEach(() => {
  jest.clearAllMocks();
});

