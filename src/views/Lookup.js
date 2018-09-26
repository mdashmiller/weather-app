import React from 'react'
import Search from '../components/Search'
import Button from '../components/Button'

const Lookup = ({
	handleZip,
	limitInputChars, 
	getWeather
}) =>
	
	<div> 
		<Search
			id="zip"
			type="text"
			placeholder="Enter US ZIP"
			autoFocus="autofocus"
			short
			onChange={handleZip}
			onKeyPress={limitInputChars}
		/>
		<Button
			onClick={getWeather}
		>
			Go
		</Button>
	</div>

export default Lookup
