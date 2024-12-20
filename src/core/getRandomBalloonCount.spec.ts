import { getRandomBalloonCount } from "./getRandomBalloonCount"
import { describe, expect, it } from "vitest"

describe("getRandomBalloonCount Function", () => {
  it("should have a value between 20 and 60 percent of the matrix.", () => {
    const matrixArray = Array.from({ length: 30 }, (_, i) => i + 3)

    matrixArray.forEach((matrix) => {
      const randomBalloonCount = getRandomBalloonCount(matrix)

      expect(randomBalloonCount).greaterThanOrEqual(Math.ceil(matrix * matrix * 0.2))
      expect(randomBalloonCount).lessThanOrEqual(Math.floor(matrix * matrix * 0.6))
    })
  })
})
