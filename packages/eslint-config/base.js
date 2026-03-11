import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";
import onlyWarn from "eslint-plugin-only-warn";
import pluginPrettier from "eslint-plugin-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      prettier: pluginPrettier,
      import: pluginImport,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "import/no-anonymous-default-export": "off",
      "react/display-name": "off",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react/self-closing-comp": "error",
      "prettier/prettier": "error",
      "object-shorthand": "error",

      quotes: ["error", "double"],
      "react/jsx-curly-brace-presence": [
        "error",
        {
          props: "never",
          children: "never",
        },
      ],
      "import/order": [
        "error",
        {
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "after",
            },
            {
              pattern: "next/*",
              group: "external",
              position: "before",
            },
            {
              pattern: "@excolog/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          groups: ["builtin", "external", "type", "object", "internal", "parent", "sibling", "index"],
          pathGroupsExcludedImportTypes: ["react", "next", "@excolog"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
          },
        },
      ],
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["next-env.d.ts", ".turbo/**", ".next/**", "dist/**", "node_modules/**"],
  },
];
