import { useCallback } from "react"

import { balloonPositionAtom, updateBalloonPositionAtom } from "../store"
import { findConnectedGroup } from "./findConnectedGroup"
import { Modal } from "antd"
import { useAtom, useSetAtom } from "jotai"

export function useBalloon() {
  const [balloonPosition, setBalloonPosition] = useAtom(balloonPositionAtom)
  const updateBalloonPosition = useSetAtom(updateBalloonPositionAtom)

  const handleBalloonClick = useCallback(
    (row: number, col: number) => {
      const connectedGroup = findConnectedGroup([row, col], balloonPosition)
      const largestGroupLength = Math.max(
        ...balloonPosition.map((position) => findConnectedGroup(position, balloonPosition).length)
      )

      if (connectedGroup.length === largestGroupLength) {
        const newPositions = balloonPosition.filter(
          ([r, c]) => !connectedGroup.some(([gr, gc]) => gr === r && gc === c)
        )
        setBalloonPosition(newPositions)

        if (newPositions.length === 0) {
          Modal.success({
            title: "🎉",
            content: "축하합니다! 게임에서 승리하셨습니다. 확인을 누르면 게임판이 리셋됩니다.",
          })
        }
      } else {
        Modal.warning({
          title: "😅",
          content: "게임에서 패배했습니다. 게임판을 리셋합니다.",
          afterClose: () => updateBalloonPosition(),
          keyboard: false,
        })
      }
    },
    [balloonPosition]
  )

  return { handleBalloonClick }
}
