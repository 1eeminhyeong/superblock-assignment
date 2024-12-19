import { generateRandomBalloonPosition } from "./generateRandomBalloonPosition"
import { describe, expect, it } from "vitest"

describe("generateRandomBalloonPosition Function", () => {
  it("should have an array pair smaller than matrix * matrix.", () => {
    const matrixArray = Array.from({ length: 30 }, (_, i) => i + 3)

    matrixArray.forEach((matrix) => {
      const balloonPosition = generateRandomBalloonPosition(matrix)

      balloonPosition.forEach((position) => {
        expect(position[0]).lessThan(matrix * matrix)
        expect(position[1]).lessThan(matrix * matrix)

        expect(position[0]).greaterThanOrEqual(0)
        expect(position[1]).greaterThanOrEqual(0)
      })
    })
  })
})
