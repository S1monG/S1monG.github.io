import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),

  // Custom linting rules
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "quotes": ["error", "single", { "avoidEscape": true, "allowTemplateLiterals": true }],
      "indent": ["error", 2],
      "semi": ["error", "never"],
    }
  },

  {
    ignores: ["**/build/**"],
  }
];