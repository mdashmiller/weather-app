import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Frame from '../components/Frame'
import WeatherIcon from '../components/WeatherIcon'
import ThermoIcon from '../components/ThermoIcon'
import Search from  '../components/Search'

class Weather extends Component {

	state = {
		day: true,
		place: '',
		temp: '',
		description: '', 
		codition: '',
		userLocClicked: false
	}

	// component methods

	getLocation = () => {

	}

	render () {
		return (
			<h1>Weather By Geolocation!!!</h1>
		)
	}

}

export default Weather

// const Display = ({
// 	dayOrNight,
// 	place,
// 	temp,
// 	description,
// 	code,
// 	switchToLookup,
// 	getLocation,
// 	userLocClicked
// }) =>
//  	<Frame>
//  		<h1
//  			className={dayOrNight}
//  		>
//  			{place}
//  		</h1>
// 		<h2>{temp} F</h2>
// 		<h3>{description}</h3>
// 		<WeatherIcon 
// 			code={code} 
// 			dayOrNight={dayOrNight}
// 		/>
// 		<ThermoIcon temp={temp} />
// 		<Search
// 			type="text"
// 			placeholder="&#xf002; Change Location"
// 			onClick={switchToLookup}
// 			lookUp
// 		/>
// 		{userLocClicked
// 			// don't display the 'use my location'
// 			// option if the user has just clicked it
// 			? null
// 			: <Search
// 				type="text"
// 				placeholder="&#xf3c5;  Use My Location"
// 				onClick={getLocation}
// 				displayPage
// 				userLocation
// 			/>
// 		}
// 	</Frame>

	

