module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    "\\.(gql|graphql)$": "jest-transform-graphql",
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  // "collectCoverage": true,
  "collectCoverageFrom": [
      "<rootDir>/components/**/*.vue",
      "<rootDir>/pages/**/*.vue"
  ]
}
