import * as findConnectedGroupModule from "./findConnectedGroup"
import { getLargestGroupLength } from "./getLargestGroupLength"
import { describe, expect, it, vi } from "vitest"

describe("getLargestGroupLength Function", () => {
  it("should return 7, which is the largest group.", () => {
    /**
     * +---+---+---+---+---+---+
     * |   |   |🎈 |🎈 |   |   |
     * +---+---+---+---+---+---+
     * |   |   |🎈 |🎈 |🎈 |   |
     * +---+---+---+---+---+---+
     * |🎈 | 🎈|   |🎈 |🎈 |   |
     * +---+---+---+---+---+---+
     * |   |   |   |   |   | 🎈|
     * +---+---+---+---+---+---+
     * |   |   | 🎈| 🎈| 🎈|   |
     * +---+---+---+---+---+---+
     * |   |   | 🎈|   | 🎈| 🎈|
     * +---+---+---+---+---+---+
     */
    const balloonPosition = [
      [5, 3],
      [4, 4],
      [3, 1],
      [1, 2],
      [4, 2],
      [2, 4],
      [5, 5],
      [2, 5],
      [4, 1],
      [3, 4],
      [2, 1],
      [0, 2],
      [4, 5],
      [2, 0],
      [3, 0],
      [3, 2],
    ]

    const MATRIX = 6

    const largestGroupLength = getLargestGroupLength(balloonPosition, MATRIX)
    expect(largestGroupLength).toBe(7)
  })

  it("should not recalculate already processed groups", () => {
    const balloonPosition = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ]
    const MATRIX = 2

    const findConnectedGroupSpy = vi.spyOn(findConnectedGroupModule, "findConnectedGroup")

    const largestGroupLength = getLargestGroupLength(balloonPosition, MATRIX)
    expect(largestGroupLength).toBe(4)
    expect(findConnectedGroupSpy).toBeCalledTimes(1)
    expect(findConnectedGroupSpy).toBeCalledWith([0, 0], balloonPosition, MATRIX)
  })
})
