module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/__test__"],
  setupFilesAfterEnv: ["<rootDir>/__test__/setup/testSetup.js"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
