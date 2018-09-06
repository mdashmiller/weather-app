import React, { Component } from 'react'
import config from './config'
import './App.css'
import Frame from './components/Frame'
import Icon from './components/Icon'
import Search from './components/Search'

// Open Weather Map API url details
const lat = '29.6261'
const lon = '-95.7316'
const PATH_BASE = 'http://api.openweathermap.org/data/2.5/weather?'
const COORDS = `lat=${lat}&lon=${lon}`
const KEY = config.key

const url = `${PATH_BASE}${COORDS}&APPID=${KEY}`

// weather-dependent icon details
const sun = "fas fa-sun fa-3x"
const cloud = "fas fa-cloud fa-3x"
const thermo = "fas fa-thermometer-full fa-3x"

class App extends Component {

	state = {
		temp: '',
		description: '',
		condition: '',
		name: ''
	}

	// component methods

	setDisplay = result => {
		// takes results from API call and
		// routes data to the proper channels
		this.setTemp(result.main.temp)
		this.setDescription(result.weather[0].description)
		this.setName(result.name)
		this.setCondition(result.weather[0].id)
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
		this.setState( {condition: id} )

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
    			<WeatherIcon id={this.state.description} />
    			{/*<Icon className={sun}></Icon>*/}
    			<Icon className={thermo}></Icon>
    			<Search type="search" placeholder="search" />
    		</Frame>
    	)
  	}
}

export default App
