import React from 'react'
import Icon from './Icon'

const WeatherIcon = ({ code, day }) => {
	// determines whether to display a
	// cloud or sun icon dependent upon
	// weather conditions

	// weather-dependent icon details
	const celestialBody = day
		? "fas fa-sun fa-3x" : "fas fa-moon fa-3x"
	const cloud = "fas fa-cloud fa-3x"	

	if (
			(code > 959 && code < 963) ||
			(code > 899 && code < 903) ||
			code === 804 ||
			code === 803 ||
			(code > 700 && code < 782) ||
			(code > 599 && code < 623) ||
			(code > 499 && code < 532) ||
			(code > 299 && code < 322) ||
			(code > 199 && code < 233)
	) {
		return <Icon dark className={cloud}></Icon>
	}
	return <Icon className={celestialBody}></Icon>
}
	
export default WeatherIcon
