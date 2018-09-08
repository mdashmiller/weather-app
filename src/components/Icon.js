import styled, { css } from "styled-components"

const Icon = styled.i`
    display: inline-block;
    width: 40px;
    margin: 10px;
    color: #c3c3c3;

    ${props => props.dark && css`
        color: #8a8a8a;
      `}
`

export default Icon
