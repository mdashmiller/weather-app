import React from 'react'
import Frame from '../components/Frame'
import Search from '../components/Search'
import { Link } from 'react-router-dom'


const Landing = () => 
	<Frame>
		<h1 id="landing-title" className="day">
			Weather
			<span className="day-2">
				Now
			</span>
		</h1>
		<Link to='/weather-by-geoloc'>			    	
			<Search
				type="text"
				placeholder="&#xf3c5;  Use My Location"
				landingPage
				userLocation
			/>
		</Link>
		<Link to='/lookup'>
			<Search
				placeholder="&#xf002;  Lookup by Zip"
				landingPage
				userZip
			/>		 		    
		</Link>    
	</Frame>

	

export default Landing
