import React, { Component } from 'react'
import config from '../config'
import { Link } from 'react-router-dom'
import Frame from './Frame'
import Search from './Search'
import Button from './Button'
import Weather from './Weather'

// Open Weather Map API url details
const PATH_BASE = 'http://api.openweathermap.org/data/2.5/weather?'
const KEY = config.key

class LookupByZip extends Component {

	state = {
		zip: '',
		result: {},
		error: null,
		searchClicked: false
	}

	// component methods

	handleZip = e => 
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

	handleClick = () => {
		this.startSpinner()
		this.getWeather()
	}

	startSpinner = () => 
		this.setState({ searchClicked: true })

	getWeather = () => {
		// call weather API with zipcode
		const ZIP = `zip=${this.state.zip}`	
		const urlZip = `${PATH_BASE}${ZIP}&APPID=${KEY}`
		fetch(urlZip)
			.then(response => response.json())
			.then(result => this.setWeatherInfo(result))
			.catch(error => this.setState({ error }))
	}

	setWeatherInfo = result =>
		// set result from API call
		// and reset zip in state
		this.setState({
			result,
			zip: '',
			searchClicked: false
		})

	clearWeather = () => 
		// resets state to prepare for
		// a new API call
		this.setState({
			result: {},
			error: null
		})
	
	render () {
		const {
			result,
			zip,
			searchClicked
		} = this.state
		if (!result.name) {
			return (
				<Frame>
					<h1 id="landing-title" className="title-gold">
						Weather
						<span className="title-grey">
							Now
						</span>
					</h1>
					<Search
						type="text"
						placeholder="Enter US ZIP"
						value={zip}
						autoFocus
						short
						onChange={this.handleZip}
						onKeyPress={this.handleKeyPress}
						id={ result.cod ? 'error-box' : undefined }
					/>
					{	!searchClicked 
							? (
								<Button onClick={this.handleClick}>
									Go
								</Button>
							) : (
								<i className="fas fa-spinner fa-2x zip-spinner">
								</i>
							)
					}
					{	result.cod &&
							<h2 id="error">Hm, that doesn't seem to be a valid US zip. Try again?</h2>
					}
				</Frame>
			)
		} else {
			return (
				<Frame>
					<Weather
						result={result}
					/>
					<Search
						type="text"
						placeholder="&#xf002; Change Location"
						value={zip}
						onClick={this.clearWeather}
						lookUp
					/>
					<Link to='/lookup-by-geoloc'>			    	
						<Search
							autoFocus
							type="text"
							placeholder="&#xf3c5;  Use My Location"
							displayPage
							userLocation
						/>
					</Link>
				</Frame>
			)
		}
	}
}

export default LookupByZip
