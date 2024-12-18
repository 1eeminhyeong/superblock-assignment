import { genRandomBalloonPosition } from "../utils"
import { atom } from "jotai"
import { atomWithDefault } from "jotai/utils"

export const DEFAULT_MATRIX = 5

export const matrixAtom = atom(DEFAULT_MATRIX)
export const balloonPositionAtom = atomWithDefault((get) => genRandomBalloonPosition(get(matrixAtom)))

export const updateBalloonPositionAtom = atom(null, (get, set) => {
  const matrix = get(matrixAtom)
  set(balloonPositionAtom, genRandomBalloonPosition(matrix))
})
