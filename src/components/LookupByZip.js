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

	clearError = () => {
		// if there was a fetch error, this will 
		// clear the API fail message and reset 
		// the form when user
		// goes to enter a new zip
		this.setState({
			error: null,
			searchClicked: false
		})
	}

	handleClick = () => {
		// handles the click event for the
		// search-by-zip submit button
		this.startSpinner()
		this.getWeather()
	}

	startSpinner = () => 
		// sets state so that a conditional
		// loading spinner will be rendered
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

	setWeatherInfo = result => {
		result.name ? (
			// set result from API call
			// and reset zip in state on 
			// a successful call
			this.setState({
				result,
				zip: '',
				searchClicked: false
			})
		) : (
			// don't reset the zip if
			// a bad zip was entered
			this.setState({
				result,
				searchClicked: false
			})
		)
	}
		
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
			error,
			searchClicked
		} = this.state
		console.log(error)
		if (!result.name) {
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
					<Search
						type="text"
						placeholder="Enter US ZIP"
						value={zip}
						autoFocus
						short
						onChange={this.handleZip}
						onKeyPress={this.handleKeyPress}
						onClick={this.clearError}
						id={ result.cod ? 'error-box' : undefined }
					/>
					{
						searchClicked && !error
							? (
								<i className="fas fa-spinner fa-2x zip-spinner">
								</i>	
							) : (
								<Button onClick={this.handleClick}>
									Go
								</Button>
							)
					}
					{
						result.cod &&
							<div id="error">
								<h2>Hm, that doesn't seem to be a valid US zip.</h2>
								<h2>Try again?</h2>
							</div>
					}
					{
						error &&
							<div>
								<h2>It looks like openweathermap.org is having some issues.</h2>
								<h2>Please try again in a few minutes.</h2>
							</div>
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
