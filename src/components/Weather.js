import React from 'react'
import WeatherIcon from './WeatherIcon'
import ThermoIcon from './ThermoIcon'

const Weather = ({
	dayOrNight,
	place,
	temp,
	description,
	condition
}) =>
	<div>
		<h1
			className={`${dayOrNight ? 'day-title' : 'night-title'}`}
		>
			{place}
		</h1>
		<h2>{temp} F</h2>
		<h3>{description}</h3>
		<WeatherIcon 
			code={condition} 
			dayOrNight={dayOrNight}
		/>
		<ThermoIcon temp={temp} />
	</div>

export default Weather
