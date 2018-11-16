import React from 'react'
import { Link } from 'react-router-dom'

const Title = () =>
	<Link to='/'>
		<h1 id="landing-title" className="title-gold">
			Weather
			<span className="title-grey">
				Now
			</span>
		</h1>
	</Link>

export default Title
