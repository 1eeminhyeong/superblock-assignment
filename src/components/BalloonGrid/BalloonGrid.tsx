import { useCallback } from "react"

import { StyledBalloon, StyledNotBalloon } from "./BalloonGrid.styles"
import { Grid } from "@/components"
import { findConnectedGroup } from "@/core"
import { balloonPositionAtom, matrixAtom, updateBalloonPositionAtom } from "@/store"
import { Modal } from "antd"
import { useAtom, useAtomValue, useSetAtom } from "jotai"

const BalloonGrid = () => {
  const matrix = useAtomValue(matrixAtom)
  const [balloonPosition, setBalloonPosition] = useAtom(balloonPositionAtom)
  const updateBalloonPosition = useSetAtom(updateBalloonPositionAtom)

  const handleBalloonClick = useCallback(
    (row: number, col: number) => {
      const connectedGroup = findConnectedGroup([row, col], balloonPosition)
      const newPosition = balloonPosition.filter(([r, c]) => !connectedGroup.some(([gr, gc]) => gr === r && gc === c))

      const largestGroupLength = Math.max(
        ...newPosition.map((position) => findConnectedGroup(position, balloonPosition).length)
      )

      if (connectedGroup.length >= largestGroupLength) {
        setBalloonPosition(newPosition)

        if (newPosition.length === 0) {
          Modal.success({
            title: "🎉",
            content: "축하합니다! 게임에서 승리하셨습니다. 확인을 누르면 게임판이 리셋됩니다.",
            afterClose: () => updateBalloonPosition(),
            keyboard: false,
          })
        }
      } else {
        Modal.warning({
          title: "게임에서 패배했습니다. 😅",
          content: "터트릴수 있는 가장 많은 풍선을 클릭해야합니다. 게임판을 리셋합니다.",
          afterClose: () => updateBalloonPosition(),
          keyboard: false,
        })
      }
    },
    [balloonPosition]
  )
  const renderItem = (rowIndex: number, colIndex: number) => {
    const isBalloon = balloonPosition.some(([r, c]) => r === rowIndex && c === colIndex)
    return isBalloon ? (
      <StyledBalloon onClick={() => handleBalloonClick(rowIndex, colIndex)}>🎈</StyledBalloon>
    ) : (
      <StyledNotBalloon
        onClick={() => {
          Modal.warning({
            title: "😅",
            content: <p>게임에서 패배했습니다. 게임판을 리셋합니다.</p>,
            afterClose: () => updateBalloonPosition(),
            keyboard: false,
          })
        }}
      />
    )
  }

  return <Grid style={{ marginTop: 20 }} rows={matrix} cols={matrix} renderItem={renderItem} />
}

export default BalloonGrid
