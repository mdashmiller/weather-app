import React, { Component } from 'react'
import config from './config'
import './App.css'
import Frame from './components/Frame'
import Tile from './components/Tile'

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
		name: ''
	}

	// component methods

	setDisplay = result => {
		// takes results from API call and
		// routes data to the proper channels
		this.setTemp(result.main.temp)
		this.setDescription(result.weather[0].description)
		this.setName(result.name)
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
    			<Tile>{this.state.temp} F</Tile>
    			<Tile placeName>{this.state.name}</Tile>
    			<Tile>{this.state.description}</Tile>
    		</Frame>
    	)
  	}
}

export default App
