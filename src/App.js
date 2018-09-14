import React, { Component } from 'react'
import config from './config'
import './App.css'
import Display from './views/Display'
import Landing from './views/Landing'

// Open Weather Map API url details
//const lat = '29.6261'
//const lon = '-95.7316'
const PATH_BASE = 'http://api.openweathermap.org/data/2.5/weather?'
//const COORDS = `lat=${lat}&lon=${lon}`
const KEY = config.key

//const url = `${PATH_BASE}${COORDS}&APPID=${KEY}`

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
		zip: ''
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
			navigator.geolocation.getCurrentPosition(position => 
				/*
				this.setState({
					lat: position.coords.latitude,
					lon: position.coords.longitude
				})
				*/
				this.setCoords(position)
			)
			//this.getWeather()
		} else {
			this.setState({ noGeoLocation: true })
		}
	}

	setCoords = (position, getWeather) => {
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
				.then(result => this.setDisplay(result))
				.catch(error => error)
		} else if (this.state.zip) {
			// lookup weather with zipcode
			const ZIP = `zip=${this.state.zip}`
			const urlZip = `${PATH_BASE}${ZIP}&APPID=${KEY}`
			fetch(urlZip)
				.then(response => response.json())
				.then(result => this.setDisplay(result))
				.catch(error => error)
		}
	}
	

	/*
	updateCoords = position =>
		// sets lat and lon in state
		// to user's position
		this.setState({
			lat: position.coords.latitude,
			lon: position.coords.longitude
		})

	geoError = () =>
		// executes when
		// getCurrentPosition() fails
		this.setState({
			lat: '',
			lon: ''
		})
	*/

	switchToLookup = () =>
		// changes the search box
		// when user clicks in it
		this.setState({ 
			searchClicked: true,
			lat: '',
			lon: '' ,
			zip: ''
		})

	/*
	lookUp = zip => {
		// lookup weather data
		// according to user-entered zipcode

	}
	*/

	// lifecycle methods

	/*
	componentDidMount() {
		if (this.state.lat && this.state.lon) {
			// lookup weather with coordinates
			const COORDS = `lat=${this.state.lat}&lon=${this.state.lon}`
			const urlCoords = `${PATH_BASE}${COORDS}&APPID=${KEY}`
			fetch(urlCoords)
				.then(response => response.json())
				.then(result => this.setDisplay(result))
				.catch(error => error)
		} else if (this.state.zip) {
			// lookup weather with zipcode
			const ZIP = `zip=${this.state.zip}`
			const urlZip = `${PATH_BASE}${ZIP}&APPID=${KEY}`
			fetch(urlZip)
				.then(response => response.json())
				.then(result => this.setDisplay(result))
				.catch(error => error)
		}	
	}
	*/

  	render() {
  		console.log(this.state.lat)
  		this.setBackground()             
    	if (this.state.lat && this.state.lon) {
    		// if user chooses to use their location
    		// weather info will be retrieved using
    		// latitude and longitude and the
    		// Display view will be shown
    		return (
    			<Display
    				dayOrNight={`${this.state.day ? 'day' : 'night'}`}
    				place={this.state.name}
    				temp={this.state.temp}
    				description={this.state.description}
    				code={this.state.condition}
    				switchToLookup={() => this.switchToLookup()}
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
    				//lookUpByZip={this.lookUp(document.getElementById('zip').value())}
    				getLocation={() => this.getLocation()}
    				switchToLookup={() => this.switchToLookup()}
    			/>
        	)  
    	}
  	}
}

export default App
