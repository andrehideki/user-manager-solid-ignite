const {defaults} = require("jest-config");
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts'],
  setupFilesAfterEnv: ["<rootDir>/setupTest.ts"],
  testMatch: [ "<rootDir>/src/__tests__/**/*.spec.ts" ]
};