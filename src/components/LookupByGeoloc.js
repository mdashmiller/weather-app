import React, { Component } from 'react'
import config from '../config'
import { Link } from 'react-router-dom'
import Canvas from './Canvas'
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
		result: null,
		error: null,
		day: null,
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
			.then(result => this.setState({ result }))
			.catch(error => this.setState({ error }))
		this.state.result &&
			this.dayOrNight(
				this.state.result.dt,
				this.state.result.sys.sunrise,
				this.state.result.sys.sunset
			)
	}

	dayOrNight = (time, sunrise, sunset) => {
		// determines if it is day or night
		// and sets state accordingly
		if (time >= sunrise && time < sunset) {
			this.setState({ day: true })
		} else {
			this.setState({ day: false })
		}
	}

	// lifecycle hooks

	componentDidMount () {
		this.getLocation()
	}

	render () {
		const {
			result,
			day,
			error
		} = this.state
		if (result) {
			return (
				<Canvas
					className={ day ? 'day-bg' : 'night-bg' }
				>
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
				</Canvas>
			)
		} else if (error) {
			return (
				<Canvas>
					<Frame>
						<p>{error.message}</p>
					</Frame>
				</Canvas>
			)
		} else {
			return (
				<Canvas>
					<Frame>
						<h1>Getting Weather...</h1>
					</Frame>
				</Canvas>
			)
		}
	}
}

export default LookupByGeoloc
