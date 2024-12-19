import { generateRandomBalloonPosition } from "../core"
import { atom } from "jotai"
import { atomWithDefault } from "jotai/utils"

export const DEFAULT_MATRIX = 5

export const matrixAtom = atom(DEFAULT_MATRIX)
export const balloonPositionAtom = atomWithDefault((get) => generateRandomBalloonPosition(get(matrixAtom)))

export const updateBalloonPositionAtom = atom(null, (get, set) => {
  const matrix = get(matrixAtom)
  set(balloonPositionAtom, generateRandomBalloonPosition(matrix))
})
