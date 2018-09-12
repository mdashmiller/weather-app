import styled, { css } from "styled-components"

const Search = styled.input`
	background: #eee;
	border: 1px solid #c3c3c3;
	border-radius: 10px;
	margin: 200px auto 20px;
	width: 200px;
	height: 34px;
	padding-left: 8px;
	font-family: 'Font Awesome 5 Free', 'Varela Round', Arial, sans-serif;
	font-weight: 900;
	font-size: 18px;

	&::placeholder {
		color: #6a6a6a;
	}

	${props => props.short && css`
	    width: 114px;
	    padding-left: 5px;
	  `}

	${props => props.landingPage && css`
		display: block;
	    width: 172px;
	   	margin: 26px auto;
		text-align: center;
		padding: 0;
		cursor: pointer;  
	  `}

	${props => props.userLocation && css`
		border: 3px solid #f46403;
			
			&:hover {
				background: #f46403;
				
				&::placeholder {
					color: #eee;
				}
			}	
	  `}

	${props => props.userZip && css`
		border: 3px solid #6a6a6a;

			&:hover {
				background: #6a6a6a;
				
				&::placeholder {
					color: #eee;
				}
			} 
	  `}
`

export default Search
