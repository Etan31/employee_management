const { addEvent } = require("../../controllers/addEvent");
const pool = require("../../db/pool");
const crypto = require("crypto");

jest.mock("../../db/pool", () => {
  const mockPool = {
    connect: jest.fn(),
  };
  return mockPool;
});
jest.mock("crypto");

exports.aaddEvent = async(req, res) => {

}