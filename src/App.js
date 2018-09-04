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

	setTemp = result => {
		this.setState( {temp: result.main.temp} )
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
    			<p>{this.state.temp}</p>
    		</div>
    	)
  	}
}

export default App
