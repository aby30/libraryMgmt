module.exports = {
    testPathIgnorePatterns: ["./.next/", "./node_modules/"],
    setupFilesAfterEnv: ["./setupTests.js"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    moduleNameMapper: {
        '\\.(scss|sass|css)$': 'identity-obj-proxy',
    },
};
  