import { useCallback } from "react"

import { StyledBalloon, StyledNotBalloon } from "./BalloonGrid.styles"
import { Grid } from "@/components"
import { findConnectedGroup, getLargestGroupLength } from "@/core"
import { balloonPositionAtom, matrixAtom, resetBalloonPositionAtom } from "@/store"
import { Modal } from "antd"
import { useAtom, useAtomValue, useSetAtom } from "jotai"

const BalloonGrid = () => {
  const matrix = useAtomValue(matrixAtom)
  const [balloonPosition, setBalloonPosition] = useAtom(balloonPositionAtom)
  const resetBalloonPosition = useSetAtom(resetBalloonPositionAtom)

  const handleBalloonClick = useCallback(
    (row: number, col: number) => {
      const connectedGroup = findConnectedGroup([row, col], balloonPosition, matrix)
      const newPosition = balloonPosition.filter(([r, c]) => !connectedGroup.some(([gr, gc]) => gr === r && gc === c))

      /**
       * Fix for recalculating groups that have already been calculated in `newPosition`.
       * This is to prevent the same group from being recalculated.
       */
      const largestGroupLength = getLargestGroupLength(newPosition, matrix)

      if (connectedGroup.length >= largestGroupLength) {
        setBalloonPosition(newPosition)

        if (newPosition.length === 0) {
          Modal.success({
            title: "🎉",
            content: "축하합니다! 게임에서 승리하셨습니다. 확인을 누르면 게임판이 리셋됩니다.",
            afterClose: () => resetBalloonPosition(),
            keyboard: false,
          })
        }
      } else {
        Modal.warning({
          title: "게임에서 패배했습니다. 😅",
          content: "터트릴수 있는 가장 많은 풍선을 클릭해야합니다. 게임판을 리셋합니다.",
          afterClose: () => resetBalloonPosition(),
          keyboard: false,
        })
      }
    },
    [balloonPosition]
  )

  const renderItem = (rowIndex: number, colIndex: number) => {
    const isBalloon = balloonPosition.some(([r, c]) => r === rowIndex && c === colIndex)
    return isBalloon ? (
      <StyledBalloon data-testid={`${rowIndex}-${colIndex}`} onClick={() => handleBalloonClick(rowIndex, colIndex)}>
        🎈
      </StyledBalloon>
    ) : (
      <StyledNotBalloon
        data-testid='not-balloon'
        onClick={() => {
          Modal.warning({
            title: "게임에서 패배했습니다. 😅",
            content: "터트릴수 있는 가장 많은 풍선을 클릭해야합니다. 게임판을 리셋합니다.",
            afterClose: () => resetBalloonPosition(),
            keyboard: false,
          })
        }}
      />
    )
  }

  return <Grid style={{ marginTop: 20, paddingLeft: 20, paddingBottom: 40 }} rows={matrix} cols={matrix} renderItem={renderItem} />
}

export default BalloonGrid
