import styled from "styled-components"

const Button = styled.button`
	height: 37px;
    width: 50px;
    margin-left: 8px;
    border-radius: 4px;
    border: 2px solid #eee;
    color: #eee;
    background: #69656f;
    padding: 0;
    font-size: 18px;
    font-family: inherit;
    font-weight: 900;
    cursor: pointer;

    	&:hover {
    		background: #f46403;
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
