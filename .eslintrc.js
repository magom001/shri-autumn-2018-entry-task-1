module.exports = {
  extends: "airbnb-base",
  env: { browser: true },
  parser: "babel-eslint",
  rules: {
    "func-names": 0,
    "object-shorthand": 0,
    "arrow-parens": 0,
    "implicit-arrow-linebreak": 0,
    "import/prefer-default-export": "off",
    "comma-dangle": ["error", "never"],
    quotes: 0,
    semi: [2, "always"],
    "space-before-function-paren": 0
  }
};
