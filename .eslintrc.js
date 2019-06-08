module.exports = {
  env: {
    'node': true
  },
  extends: [
    // 'plugin:vue/recommended',
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // "vue/require-default-prop": 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
