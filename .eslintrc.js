/* eslint-disable quotes */
/* eslint-disable quote-props */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-filename-extension": [1, { "allow": "as-needed" }],
    // eslint-disable-next-line no-dupe-keys
    "react/jsx-filename-extension": [1, { 'extensions': ['.js', '.jsx'] }],
  },
};
