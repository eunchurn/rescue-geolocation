const base = require("./library");
const hooks = require("eslint-plugin-react-hooks");
module.exports = [
  ...base,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: { "react-hooks": hooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
];
