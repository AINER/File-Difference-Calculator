import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    ignores: ["__tests__/__fixtures__/*"],
  },
  pluginJs.configs.recommended,
];
