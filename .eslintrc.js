module.exports = {
  env: {
    browser: true,
    // es2020: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    // ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {},
};
