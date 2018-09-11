import styled, { css } from "styled-components"

const Icon = styled.i`
    display: inline-block;
    width: 40px;
    margin: 20px;
    color: #c3c3c3;

    ${props => props.dark && css`
        color: #5b5b5b;
      `}
`

export default Icon
