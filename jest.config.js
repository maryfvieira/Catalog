// jest.config.js
const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  transform: {
    '^.+\\.(ts|js)$': 'babel-jest'
  },
  
  transformIgnorePatterns: [
    '/node_modules/(?!(tsyringe)/)'
  ],
  
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/'
  }),
  
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/tests/**/*.test.ts'],
  roots: ['<rootDir>'],
};