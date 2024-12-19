const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]

export function findConnectedGroup(start: number[], positions: number[][]) {
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
      if (positions.some(([br, bc]) => br === newRow && bc === newCol) && !visited.has(key([newRow, newCol]))) {
        stack.push([newRow, newCol])
      }
    })
  }

  return group
}
