import { matrixAtom, updateBalloonPositionAtom } from "@/store"
import { Button, Flex, InputNumber } from "antd"
import { useAtom, useSetAtom } from "jotai"

const MatrixController = () => {
  const updateBalloonPosition = useSetAtom(updateBalloonPositionAtom)
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
            updateBalloonPosition()
          }}
        />
      </div>
      <Button onClick={() => updateBalloonPosition()}>Reset Matrix</Button>
    </Flex>
  )
}

export default MatrixController
