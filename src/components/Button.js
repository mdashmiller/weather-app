import styled from "styled-components"

const Button = styled.button`
	height: 37px;
    width: 50px;
    margin-left: 8px;
    border-radius: 4px;
    border: 2px solid #c3c3c3;
    color: #c3c3c3;
    background: #4c7d98;
    padding: 0;
    font-size: 18px;
    font-family: inherit;
    font-weight: 900;
    cursor: pointer;

    	&:hover {
    		background: #c3c3c3;
    		color: #4c7d98;
    		border: none;
    		outline: none;
    	} 

    	&:active,
    	:focus,
    	:visited {
    		outline: none;
    	}
`

export default Button
