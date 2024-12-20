import packageJson from "./package.json"
import { resolve } from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    name: packageJson.name,
    passWithNoTests: true,
    dir: "./src",
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
})
