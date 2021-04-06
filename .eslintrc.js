module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 11,
  },
  rules: {
    "no-console": 0,
    "linebreak-style": ["error", "windows"],
    "no-underscore-dangle": { allow: ["_id"] },
  },
};
