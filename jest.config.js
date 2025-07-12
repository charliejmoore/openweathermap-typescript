/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
      tsconfig: "./tsconfig.json",
    },
  },
  moduleNameMapper: {
    // Jest ESM workaround: treat .js imports as .ts in src
    "^(\\.{1,2}/.*)\\.js$": "$1.ts",
  },
  testMatch: ["**/__tests__/**/*.test.ts"],
};
