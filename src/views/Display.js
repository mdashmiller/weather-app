import React from 'react'
import Frame from '../components/Frame'
import WeatherIcon from '../components/WeatherIcon'
import ThermoIcon from '../components/ThermoIcon'
import Search from  '../components/Search'

const Display = ({
	dayOrNight,
	place,
	temp,
	description,
	code,
	switchToLookup,
	getLocation,
	userLocClicked
}) =>
 	<Frame>
 		<h1
 			className={dayOrNight}
 		>
 			{place}
 		</h1>
		<h2>{temp} F</h2>
		<h3>{description}</h3>
		<WeatherIcon 
			code={code} 
			dayOrNight={dayOrNight}
		/>
		<ThermoIcon temp={temp} />
		<Search
			type="text"
			placeholder="&#xf3c5;  Change Location"
			onClick={switchToLookup}
			lookUp
		/>
		{userLocClicked
			// don't display the 'use my location'
			// option if the user has just clicked it
			? null
			: <Search
				type="text"
				placeholder="Use My Location"
				onClick={getLocation}
				landingPage
				userLocation
			/>
		}
	</Frame>

export default Display
