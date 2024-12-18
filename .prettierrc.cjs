/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
module.exports = {
  trailingComma: "es5",
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  quoteProps: "as-needed",
  jsxSingleQuote: true,
  endOfLine: "auto",
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
  importOrder: ["^react", "<THIRD_PARTY_MODULES>"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
}
