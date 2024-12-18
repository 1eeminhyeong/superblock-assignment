import { type ReactNode } from "react"

import { GridWrap, StyledCol, StyledRow } from "./Grid.styles"

interface GridProps {
  rows: number
  cols: number
  renderItem: (renderIndex: number, colIndex: number) => ReactNode
}

const Grid = ({ rows, cols, renderItem }: GridProps) => {
  return (
    <GridWrap>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <StyledRow key={rowIndex} gutter={[8, 8]} justify='center'>
          {Array.from({ length: cols }).map((_, colIndex) => (
            <StyledCol key={colIndex}>{renderItem(rowIndex, colIndex)}</StyledCol>
          ))}
        </StyledRow>
      ))}
    </GridWrap>
  )
}

export default Grid
