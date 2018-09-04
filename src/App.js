import React, { Component } from 'react'
import config from './config'
import './App.css'

// Open Weather Map API url details
const lat = '29.6261'
const lon = '-95.7316'
const PATH_BASE = 'http://api.openweathermap.org/data/2.5/weather?'
const COORDS = `lat=${lat}&lon=${lon}`
const KEY = config.key

const url = `${PATH_BASE}${COORDS}&APPID=${KEY}`

class App extends Component {

	state = {
		temp: ''
	}

	// component methods

	convertToFahrenheit = k => {
		// takes a temperature in Kelvin
		// and returns it in Fahrenheit
		const floatK = parseFloat(k)
		return (
			(1.8 * (floatK - 273)) + 32
			).toFixed(1)
	}

	setTemp = result => {
		const temp =  this.convertToFahrenheit(result.main.temp)
		this.setState( {temp} )
	}

	// lifecycle methods

	componentDidMount() {
		fetch(url)
			.then(response => response.json())
			.then(result => this.setTemp(result))
			.catch(error => error)
	}

  	render() {
    	return (
    		<div className="App">
    			<p>Temperature: {this.state.temp} F</p>
    		</div>
    	)
  	}
}

export default App
