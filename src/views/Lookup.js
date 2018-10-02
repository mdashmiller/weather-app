import React from 'react'
import Search from '../components/Search'
import Button from '../components/Button'

const Lookup = ({
	handleZip,
	handleKeyPress, 
	getWeather,
	error
}) =>
	
	<div> 
		<Search
			id="zip"
			type="text"
			placeholder="Enter US ZIP"
			autoFocus="autofocus"
			short
			onChange={handleZip}
			onKeyPress={handleKeyPress}
		/>
		<Button
			onClick={getWeather}
		>
			Go
		</Button>
		{	error &&
			<p>You gots an erra. Try again?</p>
		}
	</div>

export default Lookup
