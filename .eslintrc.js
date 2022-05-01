module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true,
  },
  "extends": [
    "google",
  ],
  "ignorePatterns": [
    "jest.config.js",
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
  },
  "rules": {
    "quotes": ["error", "double"],
  },
};
