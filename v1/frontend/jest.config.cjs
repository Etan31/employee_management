module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  roots: ["<rootDir>/__test__"],
  setupFilesAfterEnv: ["<rootDir>/__test__/setup/testSetup.js"],
};
