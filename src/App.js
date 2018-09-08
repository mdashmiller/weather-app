import React, { Component } from 'react'
import config from './config'
import './App.css'
import Frame from './components/Frame'
import Search from './components/Search'
import WeatherIcon from './components/WeatherIcon'
import ThermoIcon from './components/ThermoIcon'

// Open Weather Map API url details
const lat = '29.6261'
const lon = '-95.7316'
const PATH_BASE = 'http://api.openweathermap.org/data/2.5/weather?'
const COORDS = `lat=${lat}&lon=${lon}`
const KEY = config.key

const url = `${PATH_BASE}${COORDS}&APPID=${KEY}`

class App extends Component {

	state = {
		temp: '',
		description: '',
		condition: '',
		name: '',
		day: true
	}

	// component methods

	setDisplay = result => {
		// takes results from API call and
		// routes data to the proper channels
		this.setTemp(result.main.temp)
		this.setDescription(result.weather[0].description)
		this.setName(result.name)
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

	setName = name =>
		// sets this.state.name to the result
		// obtained from Open Weather Map
		this.setState( {name} )

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

		this.setColors()
	}

	setColors = () => {
		// changes colors of background and
		// fonts dependent on time of day
		if (this.state.day) {
			document.body.style = 'background: #4c7d98;'
		} else {
			document.body.style = 'background: #2a233c;'
		}
	}

	// lifecycle methods

	componentDidMount() {
		fetch(url)
			.then(response => response.json())
			.then(result => this.setDisplay(result))
			.catch(error => error)
	}

  	render() {
    	return (
	    	<Frame>
	    		<h1>{this.state.name}</h1>
	   			<h2>{this.state.temp} F</h2>
	   			<h3>{this.state.description}</h3>
	   			<WeatherIcon id={this.state.condition} daytime={this.state.day} />
	   			<ThermoIcon temp={this.state.temp} />
	   			<Search type="search" placeholder="search" />
	   		</Frame>
    	)
  	}
}

export default App
