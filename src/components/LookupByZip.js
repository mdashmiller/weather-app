import React, { Component } from 'react'
import config from '../config'
import { Link } from 'react-router-dom'
import Frame from './Frame'
import Search from './Search'
import Button from './Button'
import Weather from './Weather'

// Open Weather Map API url details
const PATH_BASE = 'http://api.openweathermap.org/data/2.5/weather?'
const KEY = config.key

class LookupByZip extends Component {

	state = {
		zip: '',
		error: null,
		day: true,
		place: '',
		temp: '',
		description: '', 
		codition: ''
	}

	// component methods

	handleZip = e => 
		// updates this.state.zip according
		// to user input
		this.setState({ zip: e.target.value })

	handleKeyPress = e => {
		// handles user keypresses in the lookup
		// by zipcode input and limits the quantity 
		// and quality of chars the user can enter
		const numOfChars = e.target.value.length	
		const char = e.key || e.keyCode
		// submit with enter key
		if (char === 13 || char === 'Enter' ) {
			this.getWeather()
		}
		// allows a max of 5 chars
		if (numOfChars < 5) {
			// input will only accept [0 - 9]
			if (char >= 48 && char <= 57) {
				return
			} else if (char >= 0 && char <= 9) {
				return
			} else {
				e.preventDefault()
			}
		} else {
			// backspace, left, right, enter, tab, home, end, 
			// and return keys can be used regardless of 
			// number of chars enterd
			if (char === 8 || char === 'Backspace'
				|| char === 37 || char === 'ArrowLeft' || char === 'Left'
				|| char === 39 || char === 'ArrowRight' || char === 'Right'
				|| char === 13 || char === 'Enter'
				|| char === 9 || char === 'Tab'
				|| char === 36 || char === 'Home'
				|| char === 35 || char === 'End') {
				return
			} else {
				e.preventDefault()
			}
		}
	}

	getWeather = () => {
		// lookup weather with zipcode
		const ZIP = `zip=${this.state.zip}`
		const urlZip = `${PATH_BASE}${ZIP}&APPID=${KEY}`
		fetch(urlZip)
			.then(response => response.json())
			.then(result => this.setWeatherInfo(result))
			.catch(error => this.setState({ error }))
	}

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
		const floatK = parseFloat(k)
		return (
			(1.8 * (floatK - 273)) + 32
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
		//this.setBackground()
	}

	render () {
		const {
			error,
			dayOrNight,
			place,
			temp,
			description,
			condition
		} = this.state
		if (!place) {
			return (
				<Frame>
					<h1 id="landing-title" className="day">
						Weather
						<span className="day-2">
							Now
						</span>
					</h1>
					<Search
						type="text"
						placeholder="Enter US ZIP"
						autoFocus
						short
						onChange={this.handleZip}
						onKeyPress={this.handleKeyPress}
						id={error && 'error-box'}
					/>
					<Button onClick={this.getWeather}>
						Go
					</Button>
					{	error &&
						<h2 id="error">Hm, that doesn't seem to be a valid US zip. Try again?</h2>
					}
				</Frame>
			)
		} else {
			return (
				<Frame>
					<Weather
						dayOrNight={dayOrNight}
						place={place}
						temp={temp}
						description={description}
						condition={condition}
					/>
					<Search
						type="text"
						placeholder="&#xf002; Change Location"
						lookUp
					/>
					<Link to='/lookup-by-geoloc'>			    	
						<Search
							autoFocus
							type="text"
							placeholder="&#xf3c5;  Use My Location"
							displayPage
							userLocation
						/>
					</Link>
				</Frame>
			)
		}
	}
}

export default LookupByZip
