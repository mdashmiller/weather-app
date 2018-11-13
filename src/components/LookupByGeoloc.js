import React, { Component } from 'react'
import config from '../config'
import { Link } from 'react-router-dom'
import Frame from './Frame'
import Weather from './Weather'
import Search from  './Search'

// Open Weather Map API url details
const PATH_BASE = 'http://api.openweathermap.org/data/2.5/weather?'
const KEY = config.key

class LookupByGeoloc extends Component {

	state = {
		lat: '',
		lon: '',
		day: true,
		place: '',
		temp: '',
		description: '', 
		codition: ''
	}

	// component methods

	getLocation = () => {
		// finds user's latitude and longitude
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				this.setCoords(position)
				this.setState({ userLocClicked: true })
			})
		} else {
			this.setState({ noGeoLocation: true })
		}
	}

	setCoords = position => {
		// sets users lattitude and longitude  
		// in state and initiates API call
		this.setState({
			lat: position.coords.latitude,
			lon: position.coords.longitude
		})
		this.getWeather()
	}

	getWeather = () => {
		// lookup weather with coordinates
		const COORDS = `lat=${this.state.lat}&lon=${this.state.lon}`
		const urlCoords = `${PATH_BASE}${COORDS}&APPID=${KEY}`
		fetch(urlCoords)
			.then(response => response.json())
			.then(result => this.setWeatherInfo(result))
			.catch(error => error)
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

	// lifecycle methods

	componentDidMount () {
		this.getLocation()
	}

	render () {
		const {
			dayOrNight,
			place,
			temp,
			description,
			condition
		} = this.state
		if (!place) {
			return (
				<Frame>
					<h1>Getting Weather...</h1>
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
					<Link to='/lookup-by-zip'>
						<Search
							type="text"
							placeholder="&#xf002; Change Location"
							lookUp
						/>
					</Link>
				</Frame>
			)
		}
	}
}

export default LookupByGeoloc
