/**
 * This function randomly generates a balloonCount based on a matrix.
 * For the fun of the game, generate values between 20% and 60%.
 * @param matrix matrix used in the grid
 * @returns {number}
 */
export const getRandomBalloonCount = (matrix: number): number => {
  const totalCells = matrix * matrix

  const minBalloonCount = Math.ceil(totalCells * 0.2)
  const maxBalloonCount = Math.floor(totalCells * 0.6)

  return Math.floor(Math.random() * (maxBalloonCount - minBalloonCount + 1)) + minBalloonCount
}
