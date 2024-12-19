import { getRandomBalloonCount } from "./getRandomBalloonCount"

export const generateRandomBalloonPosition = (matrix: number): [number, number][] => {
  const randomBalloonCount = getRandomBalloonCount(matrix)

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
