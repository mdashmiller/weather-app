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
		result: {},
		error: null,
		noGeoLocation: false
	}

	// component methods

	getLocation = () => {
		// finds user's latitude and longitude
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				this.setCoords(position)
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
		} else if (error) {
			return (		
				<Frame>
					<Link to='/'>
						<h1 id="landing-title" className="title-gold">
							Weather
							<span className="title-grey">
								Now
							</span>
						</h1>
					</Link>
					<h2>It looks like openweathermap.org is having some issues.</h2>
					<h2>Please try again in a few minutes.</h2>	    	
					<Search
						type="text"
						placeholder="&#xf3c5;  Try Again?"
						onClick={() => window.location.reload()}
						landingPage
						userLocation
						short
						style={{ 'text-align': 'center' }}
					/>
				</Frame>				
			)
		} else {
			return (			
				<Frame>
					<h2 style={{ 'margin-top': '64px' }}>Getting Weather...</h2>
					<i className="fas fa-spinner fa-2x"
						style={{ 'margin-top': '30px'}}
					>
					</i>
				</Frame>			
			)
		}
	}
}

export default LookupByGeoloc
