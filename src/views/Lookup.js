import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Search from '../components/Search'
import Button from '../components/Button'

const Lookup = () => 
	<h1>Lookup weather by zip!!!</h1>

// const Lookup = ({
// 	handleZip,
// 	handleKeyPress, 
// 	getWeather,
// 	error
// }) =>
	
// 	<div> 
// 		<Search
// 			type="text"
// 			placeholder="Enter US ZIP"
// 			autoFocus="autofocus"
// 			short
// 			onChange={handleZip}
// 			onKeyPress={handleKeyPress}
// 			id={error && 'error-box'}
// 		/>
// 		<Button
// 			onClick={getWeather}
// 		>
// 			Go
// 		</Button>
		
// 	</div>

export default Lookup
