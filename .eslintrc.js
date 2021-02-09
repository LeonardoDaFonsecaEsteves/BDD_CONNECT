module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['google'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'quotes': ['error', 'single'],
    // windows linebreaks when not in production environment
    'linebreak-style': ['error', false ? 'unix' : 'windows'],
  },
};
