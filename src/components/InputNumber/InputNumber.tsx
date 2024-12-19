import { balloonPositionAtom, matrixAtom } from "../../store"
import { InputNumber as InputNumberAntd } from "antd"
import { useAtom } from "jotai"
import { useResetAtom } from "jotai/utils"

const InputNumber = () => {
  const resetBalloonPosition = useResetAtom(balloonPositionAtom)
  const [matrix, setMatrix] = useAtom(matrixAtom)

  return (
    <div>
      matrix :
      <InputNumberAntd
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
  )
}

export default InputNumber
