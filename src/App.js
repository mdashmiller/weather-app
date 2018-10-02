import React, { Component } from 'react'
import config from './config'
import './App.css'
import Display from './views/Display'
import Landing from './views/Landing'

// Open Weather Map API url details
const PATH_BASE = 'http://api.openweathermap.org/data/2.5/weather?'
const KEY = config.key

class App extends Component {

	state = {
		temp: '',
		description: '',
		condition: '',
		name: '',
		day: true,
		searchClicked: false,
		lat: '',
		lon: '',
		noGeoLocation: false,
		zip: '',
		userLocClicked: false,
		error: null
	}

	// component methods

	setWeatherInfo = result => {
		// takes results from API call and
		// routes data to the proper channels
		this.setTemp(result.main.temp)
		this.setDescription(result.weather[0].description)
		this.setName(result.name)
		this.setCondition(result.weather[0].id)
		this.dayOrNight(result.dt, result.sys.sunrise, result.sys.sunset)
		this.setState({ searchClicked: false })
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
		this.setBackground()
	}

	setBackground = () => {
		// changes color of background dependent
		// upon time of day
		if (this.state.day) {
			document.body.style = 'background: #4c7d98;'
		} else {
			document.body.style = 'background: #2a233c;'
		}
	}

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
		if (this.state.lat && this.state.lon) {
			// lookup weather with coordinates
			const COORDS = `lat=${this.state.lat}&lon=${this.state.lon}`
			const urlCoords = `${PATH_BASE}${COORDS}&APPID=${KEY}`
			fetch(urlCoords)
				.then(response => response.json())
				.then(result => this.setWeatherInfo(result))
				.catch(error => error)
		} else if (this.state.zip) {
			// lookup weather with zipcode
			const ZIP = `zip=${this.state.zip}`
			const urlZip = `${PATH_BASE}${ZIP}&APPID=${KEY}`
			fetch(urlZip)
				.then(response => response.json())
				.then(result => this.setWeatherInfo(result))
				.catch(error => this.setState({ error }))
		}
	}
	
	switchToLookup = () => {
		// triggers a change from Landing view
		// to Lookup view when user clicks
		// in the Search box
		this.setState({ 
			temp: '',
			description: '',
			condition: '',
			name: '',
			day: true,
			searchClicked: true,
			lat: '',
			lon: '',
			noGeoLocation: false,
			zip: '',
			userLocClicked: false,
			error: null
		})
		this.resetBackground()
	}

	resetBackground = () =>
		// resets background to Landing view
		// color for Lookup view
		document.body.style = 'background: #69656f;'	
		
	setZip = e => 
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

  	render() {
  		if (this.state.temp) {
  			// if weather info has been returned from
  			// API call, show it to the user
  			return (
  				<Display
  					dayOrNight={`${this.state.day ? 'day' : 'night'}`}
  					place={this.state.name}
  					temp={this.state.temp}
  					description={this.state.description}
  					code={this.state.condition}
  					switchToLookup={() => this.switchToLookup()}
  					getLocation={() => this.getLocation()}
  					userLocClicked={this.state.userLocClicked}
  				/>
  			)
  		} else {
  			return (
  				// the initial view presented before the user
  				// has chosen whether to use their current position
  				// or to lookup weather with a zipcode 
  				<Landing
  					dayOrNight={`${this.state.day ? 'day' : 'night'}`}
  					dayOrNight2={`${this.state.day ? 'day-2' : 'night-2'}`}
  					searchClicked={this.state.searchClicked}
  					handleZip={e => this.setZip(e)}
  					handleKeyPress={e => this.handleKeyPress(e)}
  					getWeather={() => this.getWeather()}
  					getLocation={() => this.getLocation()}
  					switchToLookup={() => this.switchToLookup()}
  					error={this.state.error}
  				/>
  			)
  		}
  	}
}

export default App
