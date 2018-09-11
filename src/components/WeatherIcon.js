import React from 'react'
import Icon from './Icon'

const WeatherIcon = ({ id, daytime }) => {
	// determines whether to display a
	// cloud or sun icon dependent upon
	// weather conditions

	// weather-dependent icon details
	let celestialBody
	if (daytime) {
		celestialBody = "fas fa-sun fa-3x"
	} else {
		celestialBody = "fas fa-moon fa-3x"
	}
	const cloud = "fas fa-cloud fa-3x"	

	if (
			(id > 959 && id < 963) ||
			(id > 899 && id < 903) ||
			id === 804 ||
			id === 803 ||
			(id > 700 && id < 782) ||
			(id > 599 && id < 623) ||
			(id > 499 && id < 532) ||
			(id > 299 && id < 322) ||
			(id > 199 && id < 233)
	) {
		return <Icon dark className={cloud}></Icon>
	}
	return <Icon className={celestialBody}></Icon>
}
	
export default WeatherIcon
