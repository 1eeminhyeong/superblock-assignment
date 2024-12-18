import { Grid } from "../"
import { updateBalloonPositionAtom } from "../../store"
import { StyledBalloon, StyledNotBalloon } from "./BalloonGrid.styles"
import { Modal } from "antd"
import { useSetAtom } from "jotai"

interface BalloonGridProps {
  matrix: number
  balloonPositions: number[][]
}

const Balloon = () => {
  return <StyledBalloon>🎈</StyledBalloon>
}

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
            footer: (_, { OkBtn }) => <OkBtn />,
            afterClose: () => updateBalloonPosition(),
            keyboard: false,
          })
        }}
      />
    </>
  )
}

const BalloonGrid = ({ matrix, balloonPositions }: BalloonGridProps) => {
  const renderItem = (rowIndex: number, colIndex: number) => {
    const isBalloon = balloonPositions.some(([r, c]) => r === rowIndex && c === colIndex)
    return isBalloon ? <Balloon /> : <NotBallon />
  }

  return <Grid rows={matrix} cols={matrix} renderItem={renderItem} />
}

export default BalloonGrid
