import { matrixAtom, resetBalloonPositionAtom } from "@/store"
import { Button, Flex, InputNumber, Modal } from "antd"
import { useAtom, useSetAtom } from "jotai"

const MatrixController = () => {
  const resetBalloonPosition = useSetAtom(resetBalloonPositionAtom)
  const [matrix, setMatrix] = useAtom(matrixAtom)

  return (
    <Flex justify='center' align='center' gap={8}>
      <div>
        matrix :
        <InputNumber
          style={{ marginLeft: 4 }}
          min={3}
          max={32}
          value={matrix}
          onChange={(v) => {
            setMatrix(v!)
            resetBalloonPosition()
          }}
        />
      </div>
      <Button
        onClick={() =>
          Modal.confirm({
            title: "게임을 초기화하시겠습니까?",
            content: "게임판이 초기화됩니다.",
            onOk: () => resetBalloonPosition(),
          })
        }
      >
        Reset Matrix
      </Button>
    </Flex>
  )
}

export default MatrixController
