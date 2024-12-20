import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach, vi } from "vitest"

vi.stubEnv("NODE_ENV", "development")
afterEach(() => {
  cleanup()
})

/**
 * Fix Antd using testing-library error
 * @see(https://github.com/ant-design/ant-design/issues/21096)
 */
Object.defineProperty(window, "matchMedia", {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    }
  },
})
