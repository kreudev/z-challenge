const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/services/(.*)$': '<rootDir>/services/$1',
    '^@/context/(.*)$': '<rootDir>/context/$1',
    nanoid: '<rootDir>/__mocks__/nanoid.js', // 👈 Redirigimos `nanoid` a un mock
    'lucide-react': '<rootDir>/__mocks__/lucide-react.js', // 👈 Redirigimos `lucide-react` a un mock
  },
};

module.exports = createJestConfig(customJestConfig);
