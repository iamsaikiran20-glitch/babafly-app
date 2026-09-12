module.exports = {
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.js',
  ],

  moduleNameMapper: {
    '\\.(css|less|scss|sass)$':
      '<rootDir>/src/testStyleMock.js',
  },

  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
}