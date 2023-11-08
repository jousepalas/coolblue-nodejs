import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Your Jest configuration options here
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'], // Update the testMatch pattern
  moduleNameMapper: {
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    // Add module name mappings if needed
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Path to your tsconfig.json file
    },
  },
};

export default config;
