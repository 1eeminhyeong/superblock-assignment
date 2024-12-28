import { findConnectedGroup } from "./findConnectedGroup"
import { describe, expect, it } from "vitest"

const balloonPosition = [
  [2, 1],
  [0, 5],
  [4, 3],
  [0, 1],
  [2, 4],
  [2, 2],
  [5, 1],
  [3, 2],
  [4, 2],
  [0, 2],
  [3, 3],
  [0, 0],
  [2, 3],
  [1, 5],
  [1, 3],
  [5, 3],
]

const DEFAULT_MATRIX = 6

describe("findConnectedGroup Function", () => {
  it("should return all adjacent [rowIndex, colIndex]", () => {
    const result = [
      [1, 3],
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
      [3, 2],
      [3, 3],
      [4, 2],
      [4, 3],
      [5, 3],
    ]
    const positions2x1 = findConnectedGroup([2, 1], balloonPosition, DEFAULT_MATRIX).sort()

    expect(positions2x1).toEqual(result)
    result.forEach((pos) => {
      expect(findConnectedGroup(pos, balloonPosition, DEFAULT_MATRIX).sort()).toEqual(result)
    })
  })

  it("should return itself if there is no adjacent element.", () => {
    const noAdjacentPos = [5, 1]

    const positions = findConnectedGroup(noAdjacentPos, balloonPosition, DEFAULT_MATRIX)
    expect(positions).toEqual([noAdjacentPos])
  })
})
