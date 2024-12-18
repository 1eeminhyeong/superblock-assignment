export const genRandomBalloonPosition = (matrix: number): [number, number][] => {
  const totalCells = matrix * matrix

  // 게임의 재미를 위해 최대 BalloonCount를 20% ~ 70% 사이로 생성
  const minBalloonCount = Math.ceil(totalCells * 0.2)
  const maxBalloonCount = Math.floor(totalCells * 0.7)
  const randomBalloonCount = Math.floor(Math.random() * (maxBalloonCount - minBalloonCount + 1)) + minBalloonCount

  const positions = new Set<string>()
  const result: [number, number][] = []

  while (positions.size < randomBalloonCount) {
    const row = Math.floor(Math.random() * matrix)
    const col = Math.floor(Math.random() * matrix)
    const key = `${row}-${col}`

    if (!positions.has(key)) {
      positions.add(key)
      result.push([row, col])
    }
  }

  return result
}
