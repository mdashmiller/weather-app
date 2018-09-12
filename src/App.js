import React, { Component } from 'react'
import config from './config'
import './App.css'
import Frame from './components/Frame'
import Search from './components/Search'
import WeatherIcon from './components/WeatherIcon'
import ThermoIcon from './components/ThermoIcon'
import Button from './components/Button'

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

	setColors = () => {
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
				this.setState({
					lat: position.coords.latitude,
					lon: position.coords.longitude
				})
			)
		} else {
			this.setState({ noGeoLocation: true })
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

	handleClick = () =>
		// changes the search box
		// when user clicks in it
		this.setState({ 
			searchClicked: true,
			lat: '',
			lon: '' 
		})

	/*
	lookUp = zip => {
		// lookup weather data
		// according to user-entered zipcode

	}
	*/

	// lifecycle methods

	componentDidMount() {
		fetch(url)
			.then(response => response.json())
			.then(result => this.setDisplay(result))
			.catch(error => error)
	}

  	render() {
    	if (this.state.lat && this.state.lon) {
    		return (
    		 	<Frame>
    		 		<h1
    		 			className={`${this.state.day ? 'day' : 'night'}`}
    		 		>
    		 			{this.state.name}
    		 		</h1>
    				<h2>{this.state.temp} F</h2>
    				<h3>{this.state.description}</h3>
    				<WeatherIcon 
    					id={this.state.condition} 
    					daytime={this.state.day}
    				/>
    				<ThermoIcon temp={this.state.temp} />
    				<Search
    					type="text"
    					placeholder="&#xf3c5;  Change Location"
    					onClick={() => this.handleClick()}
    				/>
    			</Frame>
    		)
    	} else {
    		return (
				<Frame>
        			<h1
        				id="landing-title"
        				className={`${this.state.day ? 'day' : 'night'}`}
        			>
        				Weather
    	    			<span
    	    				className={`${this.state.day ? 'day-2' : 'night-2'}`}
    	    			>
    	    				Now
    	    			</span>
        			</h1>
        			{this.state.searchClicked
        				? <div> 
        					<Search
        						id="zip"
        					    type="text"
        					   	placeholder="Enter US ZIP"
        					   	autofocus="autofocus"
        					   	short
        					/>
        					<Button
        					   	//onClick={this.lookUp(document.getElementById('zip').value())}
        					>
        					   	Go
        				 	</Button>
        				</div>
        				: <div>
        					<Search
        						type="text"
        						placeholder="Use My Location"
        						onClick={() => this.getLocation()}
        						landingPage
        						userLocation
        					/>
        					<Search
        						placeholder="Lookup by Zipcode"
        						onClick={() => this.handleClick()}
        						landingPage
        						userZip
        					/>
        				</div>
        			}
        		</Frame> 
        	)  
    	}
    		
    	/*	
	    	<Frame>
	    		<h1
	    			className={`${this.state.day ? 'day' : 'night'}`}
	    		>
	    			{this.state.name}
	    		</h1>
	   			<h2>{this.state.temp} F</h2>
	   			<h3>{this.state.description}</h3>
	   			<WeatherIcon 
	   				id={this.state.condition} 
	   				daytime={this.state.day}
	   			/>
	   			<ThermoIcon temp={this.state.temp} />
	   			{this.state.searchClicked
	   			? <div> 
		   			<Search
		   				id="zip"
		   				type="text"
		   				placeholder="Enter US ZIP"
		   				autofocus="autofocus"
		   				short
		   			/>
		   			<Button
		   				//onClick={this.lookUp(document.getElementById('zip').value())}
		   			>
		   			Go
		   			</Button>
	   			</div>
	   			: <Search
	   				type="text"
	   				placeholder="&#xf3c5;  Change Location"
	   				onClick={() => this.handleClick()}
	   			/>}
	   		</Frame>
    	*/
    	
  	}
}

export default App
