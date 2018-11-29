import config from '../config'

// Open Weather Map API url details
const PATH_BASE = 'http://api.openweathermap.org/data/2.5/weather?'
const KEY = config.key

export default function (lat, lon, zip) {
	let url
	if (arguments[2] !== undefined) {
		const ZIP = `zip=${zip}`
		url = `${PATH_BASE}${ZIP}&APPID=${KEY}`
	} else {
		const COORDS = `lat=${lat}&lon=${lon}`
		url = `${PATH_BASE}${COORDS}&APPID=${KEY}`
	}
	return fetch(url)
}
