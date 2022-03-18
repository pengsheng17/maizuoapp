module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  overrides: [
    {
      files: ['src/**/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 0,
        'vue/no-unused-components': 'off'
      }
    }
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-new': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
