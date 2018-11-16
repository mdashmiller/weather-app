import React, { Component } from 'react'
import config from '../config'
import { Link } from 'react-router-dom'
import Frame from './Frame'
import Weather from './Weather'
import Search from  './Search'
import Title from './Title'
import NoGeo from  './NoGeo'
import ErrorMsg from './ErrorMsg'

// Open Weather Map API url details
const PATH_BASE = 'http://api.openweathermap.org/data/2.5/weather?'
const KEY = config.key

class LookupByGeoloc extends Component {

	state = {
		lat: '',
		lon: '',
		result: {},
		error: null,
		noGeoLocation: false
	}

	// component methods

	getLocation = () => //{
		// finds user's latitude and longitude
		navigator.geolocation.getCurrentPosition(this.setCoords, this.geoError)

	setCoords = position => {
		// sets users lattitude and longitude  
		// in state and initiates API call
		this.setState({
			lat: position.coords.latitude,
			lon: position.coords.longitude
		})
		this.getWeather()
	}

	geoError = () =>
		// sets state to render a conditonal template
		// when users geolocation is disabled
		this.setState({ noGeoLocation: true })

	getWeather = () => {
		// call weather API with coordinates
		const COORDS = `lat=${this.state.lat}&lon=${this.state.lon}`
		const urlCoords = `${PATH_BASE}${COORDS}&APPID=${KEY}`
		fetch(urlCoords)
			.then(response => response.json())
			.then(result => this.setWeatherInfo(result))
			.catch(error => this.setState({ error }))
		
	}

	setWeatherInfo = result => 
		this.setState({ result })

	// lifecycle hooks

	componentDidMount () {
		this.getLocation()
	}

	render () {
		const {
			result,
			noGeoLocation,
			error
		} = this.state
		if (result.name) {
			return (
				<Frame>
					<Weather
						result={result}
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
		} else if (noGeoLocation) {
			return (
				<NoGeo />
			)
		} else if (error) {
			return (		
				<Frame>
					<Title />
					<ErrorMsg />	    	
					<Search
						type="text"
						placeholder="&#xf3c5;  Try Again?"
						onClick={() => window.location.reload()}
						landingPage
						userLocation
						short
						geoError
					/>
				</Frame>				
			)		
		} else {
			return (			
				<Frame>
					<h2 className="geoloc-load-title">Getting Weather...</h2>
					<i className="fas fa-spinner fa-2x geoloc-spinner">
					</i>
				</Frame>			
			)
		}
	}
}

export default LookupByGeoloc
