import { findConnectedGroup } from "./findConnectedGroup"

/**
 * This function returns the length of the largest of the groups.
 * Uses the Map data type to avoid counting already counted groups.
 * @param balloonPosition balloonPosition to calculate
 * @returns {number}
 */
export function getLargestGroupLength(balloonPosition: number[][], matrix: number): number {
  const map = new Map<string, number>()

  balloonPosition.forEach(([r, c]) => {
    if (!map.has(`${r}-${c}`)) {
      const connected = findConnectedGroup([r, c], balloonPosition, matrix)
      connected.forEach(([gr, gc]) => map.set(`${gr}-${gc}`, connected.length))
    }
  })

  return Math.max(...Array.from(map.values()))
}
