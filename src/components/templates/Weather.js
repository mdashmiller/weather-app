import React, { Component } from 'react'
import WeatherIcon from '../ui/WeatherIcon'
import ThermoIcon from '../ui/ThermoIcon'
import PropTypes from 'prop-types'

class Weather extends Component {

	state = {
		day: null,
		place: '',
		temp: '',
		description: '', 
		codition: null
	}

	// component methods

	setWeatherInfo = result => {
		// takes results from API call and
		// routes data to the proper channels
		this.setTemp(result.main.temp)
		this.setDescription(result.weather[0].description)
		this.setPlace(result.name)
		this.setCondition(result.weather[0].id)
		this.dayOrNight(result.dt, result.sys.sunrise, result.sys.sunset)
	}

	setTemp = tempK => {
		// sets this.state.temp to the result
		// obtained from Open Weather Map
		const tempF =  this.convertToFahrenheit(tempK)
		this.setState( {temp: tempF} )
	}

	convertToFahrenheit = k => {
		// takes a temperature in Kelvin
		// and returns it in Fahrenheit
		return (
			(1.8 * (k - 273)) + 32
		).toFixed(1)
	}

	setDescription = weather =>
		// sets this.state.description to the result
		// obtained from Open Weather Map
		this.setState( {description: weather })

	setPlace = place =>
		// sets this.state.name to the result
		// obtained from Open Weather Map
		this.setState( {place} )

	setCondition = id =>
		// sets this.state.condition to the result
		// obtained from Open Weather Map
		this.setState( {condition: id} )

	dayOrNight = (time, sunrise, sunset) => {
		// determines if it is day or night
		// and sets state accordingly
		if (time >= sunrise && time < sunset) {
			this.setState({ day: true })
		} else {
			this.setState({ day: false })
		}
	}

	// lifecycle hooks

	componentDidMount () {
		this.setWeatherInfo(this.props.result)
	}

	render () {
		const {
			day,
			place,
			temp,
			description,
			condition
		} = this.state
		return (
			<div>
				<h1 className="title-gold">
					{place}
				</h1>
				<h2>{temp} F</h2>
				<h3>{description}</h3>
				<WeatherIcon 
					code={condition} 
					day={day}
				/>
				<ThermoIcon temp={temp} />
			</div>
		)
	}
}

Weather.propTypes = {
	result: PropTypes.shape({
		name: PropTypes.string,
		main: PropTypes.shape({
			temp: PropTypes.number
		}),
		weather: PropTypes.arrayOf(
			PropTypes.shape({
				description: PropTypes.string,
				id: PropTypes.number
			})
		),
		dt: PropTypes.number,
		sys: PropTypes.shape({
			sunrise: PropTypes.number,
			sunset: PropTypes.number
		})
	})
}

export default Weather
