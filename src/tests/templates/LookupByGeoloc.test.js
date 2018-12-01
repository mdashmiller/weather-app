import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BrowserRouter, Link } from 'react-router-dom'

import LookupByGeoloc from '../../components/templates/LookupByGeoloc'
import Frame from '../../components/ui/Frame'
import Title from '../../components/ui/Title'
import ErrorMsg from '../../components/templates/ErrorMsg'
import Search from '../../components/ui/Search'
import NoGeo from '../../components/templates/NoGeo'
import Weather from '../../components/templates/Weather'

Enzyme.configure({ adapter: new Adapter() })

// jest.mock('../../services/openWeatherMap')

// describe('<LookupByGeoloc /> basic rendering', () => {

// 	it('renders without crashing', done => {
// 	  	const div = document.createElement('div')
// 	  	ReactDOM.render(
// 	  		<BrowserRouter>
// 	  			<LookupByGeoloc />
// 	  		</BrowserRouter>,
// 	  	div)

// 	  	setTimeout(() => {
// 	  		ReactDOM.unmountComponentAtNode(div)
// 	  		done()
// 	  	})
	  	
// 	})

// 	test('has a valid snapshot', () => {
// 		const component = renderer.create(
// 			<BrowserRouter>
// 				<LookupByGeoloc />
// 			</BrowserRouter>
// 		)
// 		let tree = component.toJSON()
// 		expect(tree).toMatchSnapshot()
// 	})

// })

// describe('<LookupByGeoloc /> rendering with no weather data', () => {

// 	jest.mock('../../services/openWeatherMap')
// 	let wrapper

// 	beforeEach(() => {
// 		wrapper = shallow(<LookupByGeoloc />)
// 		wrapper.setState({ result: {} })
// 	})

// 	it('renders 1 <Frame> component', () => {
// 		expect(wrapper.find(Frame).length).toBe(1)
// 	})

// 	it('renders 1 <h2> element', () => {
// 		expect(wrapper.find('h2').length).toBe(1)
// 	})

// 	it('renders 1 <i> element', () => {
// 		expect(wrapper.find('i').length).toBe(1)
// 	})

// })

// describe('<LookupByGeoloc /> rendering with an error', () => {

// 	jest.mock('../../services/openWeatherMap')
// 	let wrapper
// 	let error

// 	beforeEach(() => {
// 		wrapper = shallow(<LookupByGeoloc />)
// 		error = { message: 'error' }
// 		wrapper.setState({ error })
// 	})

// 	it('renders 1 <Frame> component', () => {
// 		expect(wrapper.find(Frame).length).toBe(1)
// 	})

// 	it('renders 1 <Title> component', () => {
// 		expect(wrapper.find(Title).length).toBe(1)
// 	})

// 	it('renders 1 <ErrorMsg> component', () => {
// 		expect(wrapper.find(ErrorMsg).length).toBe(1)
// 	})

// 	it('renders 1 <Search> component', () => {
// 		expect(wrapper.find(Search).length).toBe(1)
// 	})

// })

// describe('<LookupByGeoloc /> rendering with geolocation disabled', () => {

// 	jest.mock('../../services/openWeatherMap')

// 	it('renders 1 <NoGeo> component', () => {
// 		const wrapper = shallow(<LookupByGeoloc />)
// 		wrapper.setState({ noGeoLocation: true })
// 		expect(wrapper.find(NoGeo).length).toBe(1)
// 	})	

// })

// describe('<LookupByGeoloc /> rendering with weather data', () => {

// 	jest.mock('../../services/openWeatherMap')
// 	let wrapper

// 	beforeEach(() => {
// 		wrapper = shallow(<LookupByGeoloc />)
// 	})

// 	it('renders 1 <Frame> component', () => {
// 		expect(wrapper.find(Frame).length).toBe(1)
// 	})	

// 	it('renders 1 <Weather> component', () => {
// 		expect(wrapper.find(Weather).length).toBe(1)
// 	})

// 	it('renders 1 <Search> component', () => {
// 		expect(wrapper.find(Search).length).toBe(1)
// 	})	

// })

// describe('<LookupByGeoloc> Link functionality when there is weather data', () => {

// 	jest.mock('../../services/openWeatherMap')

// 	it('contains a <Link> to get weather by zip', () => {
// 		const wrapper = shallow(<LookupByGeoloc />)
// 		expect(wrapper.find(Link).prop('to')).toBe('/lookup-by-zip')
// 	})

// })

// describe('<LookupByGeoloc> Search functionality when there is an error', () => {

// 	jest.mock('../../services/openWeatherMap')

// 	it('reloads the page when clicked', () => {
// 		const wrapper = shallow(<LookupByGeoloc />)
// 		wrapper.setState({
// 			error: {
// 				message: 'error'
// 			}
// 		})
// 		window.location.reload = jest.fn()
// 		wrapper.find(Search).simulate('click')
// 		expect(window.location.reload).toHaveBeenCalled()
// 	})

// })

// describe('weather data fetched on mount', () => {

// 	it('sets the API result in state', done => {
// 		// const fakeData = {
// 		// 	name: 'Mock Town'
// 		// }
// 		const wrapper = shallow(<LookupByGeoloc />)

// 		setTimeout(() => {
// 			wrapper.update()
// 			const state = wrapper.instance().state
// 			expect(state.result).toEqual({})

// 			done()
// 		})

// 	})

// })

// describe('testing getLocation', () => {

// 	it('calls setCoords when geolocation is enabled', () => {
// 		const wrapper = shallow(<LookupByGeoloc />)
// 		const instance = wrapper.instance()
// 		jest.spyOn(instance, 'setCoords')
// 		instance.getLocation()
// 		expect(instance.setCoords).toHaveBeenCalled()
// 	})

// 	// it('calls geoError when geolocation is disabled', () => {
	
// 	// })

// })

// describe('calling getWeather', () => {

// 	jest.mock('../../services/openWeatherMap')

// 	it('calls getWeather', () => {
// 		const wrapper = shallow(<LookupByGeoloc />)
// 		const instance = wrapper.instance()
// 		jest.spyOn(instance, 'getWeather')
// 		instance.componentDidMount()
// 		expect(instance.getWeather).toHaveBeenCalled()
// 	})

// })

describe('checking setupTests', () => {

	it('sets lat and lon in state', () => {
		const wrapper = shallow(<LookupByGeoloc />)
		expect(wrapper.state('lat')).toBe(29.8)
		expect(wrapper.state('lon')).toBe(95.4)

	})

})

// // describe('directly invoking getWeather', () => {

// // 	it('calls getWeather', () => {
// // 		const wrapper = shallow(<LookupByGeoloc />)
// // 		const instance = wrapper.instance()
// // 		const position = {
// // 			coords: {
// // 				latitude: 29.8,
// // 				longitude: 95.4
// // 			}
// // 		}
// // 		jest.spyOn(instance, 'getWeather')
// // 		instance.setCoords(position)
// // 		expect(instance.getWeather).toHaveBeenCalled()
// // 	})

// // })
