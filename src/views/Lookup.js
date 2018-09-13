import React from 'react'
import Search from '../components/Search'
import Button from '../components/Button'

const Lookup = (/*{ lookUpByZip }*/) =>
	<div> 
		<Search
			id="zip"
			type="text"
			placeholder="Enter US ZIP"
			autofocus="autofocus"
			short
		/>
		<Button
			//onClick={lookUpByZip}
		>
			Go
		</Button>
	</div>

export default Lookup
