import { matrixAtom } from "@/store"
import userEvent from '@testing-library/user-event'
import { render, renderHook, waitFor } from "@testing-library/react"
import { useAtomValue } from "jotai"
import { describe, expect, it } from "vitest"
import MatrixController from "./MatrixController"


describe("MatrixController Component", () => {
  it("should be set to 5 for the initial matrix.", () => {
    const { result } = renderHook(() => useAtomValue(matrixAtom))

    expect(result.current).toBe(5)
  })

  it("should change the matrix value via InputNumber", async () => {
    const rendered = render(<MatrixController />)

    const { result } = renderHook(() => useAtomValue(matrixAtom))

    const upButton = rendered.getAllByRole('button')[0]
    const downButton = rendered.getAllByRole('button')[1]

    userEvent.click(upButton)
    await waitFor(() => expect(result.current).toBe(6))

    userEvent.click(upButton)
    await waitFor(() => expect(result.current).toBe(7))

    userEvent.click(downButton)
    await waitFor(() => expect(result.current).toBe(6))

    userEvent.click(downButton)
    await waitFor(() => expect(result.current).toBe(5))
  })
})