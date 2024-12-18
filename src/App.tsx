import "./App.css"
import { BalloonGrid } from "./components"
import { balloonPositionAtom, matrixAtom } from "./store"
import { InputNumber } from "antd"
import { useAtom, useAtomValue } from "jotai"

function App() {
  const [matrix, setMatrix] = useAtom(matrixAtom)
  const balloonPositions = useAtomValue(balloonPositionAtom)

  return (
    <>
      matrix :
      <InputNumber style={{ marginLeft: 4 }} min={3} max={32} value={matrix} onChange={(v) => setMatrix(v!)} />
      <BalloonGrid matrix={matrix} balloonPositions={balloonPositions} />
    </>
  )
}

export default App
