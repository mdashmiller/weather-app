import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import openWeatherMap from '../../services/openWeatherMap'
import Weather from './Weather'
import ErrorMsg from './ErrorMsg'
import Frame from '../ui/Frame'
import Search from '../ui/Search'
import Button from '../ui/Button'
import Title from '../ui/Title'

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
		const char = e.key
		const selection = document.getSelection().toString()
		// submit with enter key
		if (char === 'Enter' ) {
			this.getWeather()
		}
		// allows a max of 5 chars and allows user
		// to replace any chars that are highlighted
		if (numOfChars < 5 || selection !== '') {
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
			if (char === 'Backspace'
				|| char === 'ArrowLeft' || char === 'Left'
				|| char === 'ArrowRight' || char === 'Right'
				|| char === 'Enter'
				|| char === 'Tab'
				|| char === 'Home'
				|| char === 'End') {
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
		openWeatherMap(undefined, undefined, this.state.zip)
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
		if (!result.name) {
			return (
				<Frame>
					<Title />
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
							<ErrorMsg />
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
