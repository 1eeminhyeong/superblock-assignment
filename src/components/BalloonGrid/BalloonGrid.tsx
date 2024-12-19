import { Grid } from "../"
import { useBalloon } from "../../core"
import { balloonPositionAtom, matrixAtom, updateBalloonPositionAtom } from "../../store"
import { StyledBalloon, StyledNotBalloon } from "./BalloonGrid.styles"
import { Modal } from "antd"
import { useAtomValue, useSetAtom } from "jotai"

const NotBallon = () => {
  const [modal, contextHolder] = Modal.useModal()
  const updateBalloonPosition = useSetAtom(updateBalloonPositionAtom)

  return (
    <>
      {contextHolder}
      <StyledNotBalloon
        onClick={() => {
          modal.warning({
            title: "😅",
            content: <p>게임에서 패배했습니다. 게임판을 리셋합니다.</p>,
            afterClose: () => updateBalloonPosition(),
            keyboard: false,
          })
        }}
      />
    </>
  )
}

const BalloonGrid = () => {
  const matrix = useAtomValue(matrixAtom)
  const balloonPosition = useAtomValue(balloonPositionAtom)
  const { handleBalloonClick } = useBalloon()

  const renderItem = (rowIndex: number, colIndex: number) => {
    const isBalloon = balloonPosition.some(([r, c]) => r === rowIndex && c === colIndex)
    return isBalloon ? (
      <StyledBalloon onClick={() => handleBalloonClick(rowIndex, colIndex)}>🎈</StyledBalloon>
    ) : (
      <NotBallon />
    )
  }

  return <Grid style={{ marginTop: 20 }} rows={matrix} cols={matrix} renderItem={renderItem} />
}

export default BalloonGrid
