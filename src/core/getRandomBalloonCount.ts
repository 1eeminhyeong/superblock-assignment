export const getRandomBalloonCount = (matrix: number) => {
  const totalCells = matrix * matrix

  const minBalloonCount = Math.ceil(totalCells * 0.2)
  const maxBalloonCount = Math.floor(totalCells * 0.7)

  return Math.floor(Math.random() * (maxBalloonCount - minBalloonCount + 1)) + minBalloonCount
}
