import { Col, Row } from "antd"
import styled from "styled-components"

export const GridWrap = styled.div`
  margin: 0 auto;
`

export const StyledRow = styled(Row)``

export const StyledCol = styled(Col)`
  border: 1px solid black;
  background-color: white;

  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;

  cursor: pointer;
`
