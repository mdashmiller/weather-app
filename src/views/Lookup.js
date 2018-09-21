import React from 'react'
import Search from '../components/Search'
import Button from '../components/Button'

const Lookup = ({
	handleZip, 
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
		/>
		<Button
			onClick={getWeather}
		>
			Go
		</Button>
	</div>

export default Lookup
