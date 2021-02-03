module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ['<rootDir>/'],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  // @TODO "@testing-library/react/cleanup-after-each",
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // the "." is for using baseURL with Typescript configuration
  // https://github.com/vercel/next.js/discussions/12726
  moduleDirectories: ['.', 'node_modules'],

  // handle CSS, e.g. import './app.css'
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.ts'
    // '\\.svg': '<rootDir>/src/__mocks__/svgMock.ts'
  },

  // what to ignore
  testPathIgnorePatterns: [
    '<rootDir>/dist',
    '<rootDir>/public',
    '<rootDir>/src/components/__stories__'
  ],

  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.ts*',
    '<rootDir>/src/lib/**/*.ts',
    '!<rootDir>/dist',
    '!<rootDir>/src/components/**/*.stories.tsx*'
  ],

  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70
    }
  },

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json'
    }
  }
}
