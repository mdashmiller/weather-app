import React from 'react'
import { Link } from 'react-router-dom'
import Frame from '../ui/Frame'
import Search from '../ui/Search'
import Title from '../ui/Title'

const Landing = () => 
	<Frame>
		<Title />
		<Link to='/lookup-by-geoloc'>			    	
			<Search
				type="text"
				placeholder="&#xf3c5;  Use My Location"
				landingPage
				userLocation
			/>
		</Link>
		<Link to='/lookup-by-zip'>
			<Search
				placeholder="&#xf002;  Lookup by Zip"
				landingPage
				userZip
			/>		 		    
		</Link>    
	</Frame>

export default Landing
