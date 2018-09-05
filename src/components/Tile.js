import React, { Component } from 'react'
import styled, { css } from "styled-components"

const Tile = styled.div`
	border: 1px solid black;
	display: inline-block;
    width: 200px;
    height: 130px;
    margin: 10px;
    padding-top: 100px;

    ${props => props.placeName && css`
		border: none;	
    `}
`

export default Tile
