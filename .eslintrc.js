module.exports = {
  extends: "airbnb-base",
  env: { browser: true },
  parser: "babel-eslint",
  rules: {
    "arrow-parens": 0,
    "implicit-arrow-linebreak": 0,
    "import/prefer-default-export": "off",
    "comma-dangle": ["error", "never"],
    quotes: 0,
    semi: [2, "always"],
    "space-before-function-paren": 0
  }
};
