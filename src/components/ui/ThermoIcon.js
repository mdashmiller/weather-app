import React from 'react'
import Icon from './Icon'
import PropTypes from 'prop-types'

// weather-dependent icon details
const thermoHot = "fas fa-thermometer-full fa-3x"
const thermoWarm = "fas fa-thermometer-three-quarters fa-3x"
const thermoCool = "fas fa-thermometer-half fa-3x"
const thermoCold = "fas fa-thermometer-empty fa-3x"

const ThermoIcon = ({ temp }) => {
	// determines which thermometer icon to
	// display dependent upon temperature
	if (temp > 32 && temp < 69) {
		return <Icon className={thermoCool}></Icon>
	} else if (temp >= 69 && temp < 86) {
		return <Icon className={thermoWarm}></Icon>
	} else if (temp >= 86) {
		return <Icon className={thermoHot}></Icon>
	} else {
		return <Icon className={thermoCold}></Icon>
	}
}

ThermoIcon.propTypes = {
	temp: PropTypes.string
}

export default ThermoIcon
