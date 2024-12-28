import BalloonGrid from "./BalloonGrid"
import { findConnectedGroup, getLargestGroupLength } from "@/core"
import { balloonPositionAtom } from "@/store"
import { render, renderHook, waitFor } from "@testing-library/react"
import { Modal } from "antd"
import { useAtomValue } from "jotai"
import { beforeEach, describe, expect, it, vi } from "vitest"

// @ts-expect-error - Mocking antd
vi.mock(import("antd"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    Modal: {
      ...actual.Modal,
      success: vi.fn(),
      warning: vi.fn(),
    },
  }
})

describe("BallooGrid Component", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render a warning modal, if you click on a not-balloon cell", () => {
    const rendered = render(<BalloonGrid />)

    const notBallooned = rendered.getAllByTestId("not-balloon")
    notBallooned[0].click()

    expect(Modal.warning).toHaveBeenCalled()
    expect(Modal.success).not.toHaveBeenCalled()
  })

  it("should render a warning modal, if the most connected balloon is not clicked.", () => {
    const rendered = render(<BalloonGrid />)

    const { result } = renderHook(() => useAtomValue(balloonPositionAtom))

    const largestGroupLength = getLargestGroupLength(result.current)

    result.current.forEach((pos) => {
      const connectedGroup = findConnectedGroup(pos, result.current).length
      if (largestGroupLength > connectedGroup) {
        const [row, col] = pos
        rendered.getByTestId(`${row}-${col}`).click()

        expect(Modal.warning).toHaveBeenCalled()
        expect(Modal.success).not.toHaveBeenCalled()
        return
      }
    })
  })

  it("should render a success modal, if all balloons are clicked.", async () => {
    const rendered = render(<BalloonGrid />)

    const { result } = renderHook(() => useAtomValue(balloonPositionAtom))

    while (result.current.length > 0) {
      const largestGroupLength = getLargestGroupLength(result.current)

      const target = result.current.find((pos) => {
        const connectedGroup = findConnectedGroup(pos, result.current).length
        return largestGroupLength === connectedGroup
      })

      if (!target) break

      const [row, col] = target
      rendered.getByTestId(`${row}-${col}`).click()

      await waitFor(() => {
        expect(rendered.queryByTestId(`${row}-${col}`)).not.toBeInTheDocument()
      })
    }

    expect(Modal.success).toHaveBeenCalled()
    expect(Modal.warning).not.toHaveBeenCalled()
  })
})
