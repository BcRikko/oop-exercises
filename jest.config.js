module.exports = {
  verbose: true,
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "js"],
  testMatch: [ "<rootDir>/src/**/(*.)+test.(ts|js)"]
};
