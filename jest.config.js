module.exports = {
  verbose: true,
  testEnvironment: 'node',
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  transform: {
    //'.*\\.(vue)$': 'vue-jest',
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.jsx?$': './tests/transform.js',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'/*,
    '\\.(css|less|scss)$': 'identity-obj-proxy'*/
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/.*'
    //'<rootDir>/node_modules/(?!vue-trix).+\\.js$'
  ],
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    //'**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
    '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
  ],
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary'],
  collectCoverageFrom: [
    'src/components/*.{js,vue}',
    '!**/node_modules/**',
    '!src/index.js'
  ]
}
