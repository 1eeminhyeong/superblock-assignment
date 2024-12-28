const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]

/**
 * This function returns the groups associated with a specific position.
 * It uses the DFS algorithm.
 * @param start Where to start position in DFS
 * @param positions The positions to be checked
 * @returns {number[][]}
 */
export function findConnectedGroup(start: number[], positions: number[][], matrix: number): number[][] {
  const visited = new Set<string>()
  const group: number[][] = []
  const stack = [start]

  const key = ([r, c]: number[]) => `${r}-${c}`

  while (stack.length) {
    const [r, c] = stack.pop()!
    const posKey = key([r, c])

    if (visited.has(posKey)) continue

    visited.add(posKey)
    group.push([r, c])

    directions.forEach(([dr, dc]) => {
      const newRow = r + dr
      const newCol = c + dc

      if (
        newRow >= 0 &&
        newCol >= 0 &&
        newRow < matrix &&
        newCol < matrix &&
        positions.some(([br, bc]) => br === newRow && bc === newCol) &&
        !visited.has(key([newRow, newCol]))
      ) {
        stack.push([newRow, newCol])
      }
    })
  }

  return group
}
