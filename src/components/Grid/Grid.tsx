import { CSSProperties, type ReactNode } from "react"

import { GridWrap, StyledCol, StyledRow } from "./Grid.styles"

interface GridProps {
  rows: number
  cols: number
  renderItem: (rowIndex: number, colIndex: number) => ReactNode
  style?: CSSProperties
}

const Grid = ({ rows, cols, renderItem, style }: GridProps) => {
  return (
    <GridWrap style={style}>
      {Array.from({ length: rows }).map((_, y) => (
        <StyledRow key={y} gutter={[8, 8]} justify='center'>
          {Array.from({ length: cols }).map((_, x) => (
            <StyledCol key={x}>{renderItem(x, y)}</StyledCol>
          ))}
        </StyledRow>
      ))}
    </GridWrap>
  )
}

export default Grid
