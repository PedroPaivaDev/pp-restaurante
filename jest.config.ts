export default {
  clearMocks: true,
  bail: true,
  testEnvironment: 'jest-environment-jsdom',
  coverageProvider: "v8",
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/styles/'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
            decorators: true,
          },
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
            react: {
              runtime: "automatic",
            },
          },
        },
        module: {
          type: "es6",
          noInterop: false,
        },
      },
    ],
  },
}
