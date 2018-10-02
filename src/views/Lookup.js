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
			type="text"
			placeholder="Enter US ZIP"
			autoFocus="autofocus"
			short
			onChange={handleZip}
			onKeyPress={handleKeyPress}
			id={error && 'error-box'}
		/>
		<Button
			onClick={getWeather}
		>
			Go
		</Button>
		{	error &&
			<h2 id="error">Hm, that doesn't seem to be a valid US zip. Try again?</h2>
		}
	</div>

export default Lookup
