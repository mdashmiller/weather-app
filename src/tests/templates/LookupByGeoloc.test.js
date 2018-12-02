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

describe('<LookupByGeoloc /> basic rendering', () => {

	it('renders without crashing', done => {
	  	const div = document.createElement('div')
	  	ReactDOM.render(
	  		<BrowserRouter>
	  			<LookupByGeoloc />
	  		</BrowserRouter>,
	  	div)

	  	setTimeout(() => {
	  		ReactDOM.unmountComponentAtNode(div)
	  		done()
	  	})
	  	
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<BrowserRouter>
				<LookupByGeoloc />
			</BrowserRouter>
		)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

})

describe('<LookupByGeoloc /> rendering with no weather data', () => {

	let wrapper

	beforeAll(() => {
		wrapper = shallow(<LookupByGeoloc />)
	})

	beforeEach(() => {
		wrapper.setState({ result: { name: '' } })
	})

	it('renders 1 <Frame> component', () => {
		expect(wrapper.find(Frame).length).toBe(1)
	})

	it('renders 1 <h2> element', () => {
		expect(wrapper.find('h2').length).toBe(1)
	})

	it('renders 1 <i> element', () => {
		expect(wrapper.find('i').length).toBe(1)
	})

})

describe('<LookupByGeoloc /> rendering with an error', () => {

	let wrapper

	beforeAll(() => {
		wrapper = shallow(<LookupByGeoloc />)
	})

	beforeEach(() => {
		wrapper.setState({
			result: {
				name: ''
			},
			error: { 
				message: 'error' 
			}
		})
	})

	it('renders 1 <Frame> component', () => {
		expect(wrapper.find(Frame).length).toBe(1)
	})

	it('renders 1 <Title> component', () => {
		expect(wrapper.find(Title).length).toBe(1)
	})

	it('renders 1 <ErrorMsg> component', () => {
		expect(wrapper.find(ErrorMsg).length).toBe(1)
	})

	it('renders 1 <Search> component', () => {
		expect(wrapper.find(Search).length).toBe(1)
	})

})

describe('<LookupByGeoloc /> rendering with geolocation disabled', () => {

	it('renders 1 <NoGeo> component', () => {
		const wrapper = shallow(<LookupByGeoloc />)
		wrapper.setState({ noGeoLocation: true })
		expect(wrapper.find(NoGeo).length).toBe(1)
	})	

})

describe('<LookupByGeoloc /> rendering with weather data', () => {

	let wrapper

	beforeAll(() => {
		wrapper = shallow(<LookupByGeoloc />)
	})

	it('renders 1 <Frame> component', () => {
		expect(wrapper.find(Frame).length).toBe(1)
	})	

	it('renders 1 <Weather> component', () => {
		expect(wrapper.find(Weather).length).toBe(1)
	})

	it('renders 1 <Search> component', () => {
		expect(wrapper.find(Search).length).toBe(1)
	})	

	it('renders 1 <Link>', () => {
		expect(wrapper.find(Link).length).toBe(1)
	})

})

describe('<LookupByGeoloc> Link functionality when there is weather data', () => {

	it('contains a <Link> to get weather by zip', done => {
		const wrapper = shallow(<LookupByGeoloc />)

		setTimeout(() => {
			wrapper.update()
			expect(wrapper.find(Link).prop('to')).toBe('/lookup-by-zip')
			done()
		})
	})

})

describe('<LookupByGeoloc> Search functionality when there is an error', () => {

	it('reloads the page when clicked', () => {
		const wrapper = shallow(<LookupByGeoloc />)
		wrapper.setState({
			error: {
				message: 'error'
			}
		})
		window.location.reload = jest.fn()
		wrapper.find(Search).simulate('click')
		expect(window.location.reload).toHaveBeenCalled()
	})

})

describe('weather data fetched on mount with geolocation enabled', () => {

	it('sets the API result in state', done => {
		const wrapper = shallow(<LookupByGeoloc />)

		setTimeout(() => {
			wrapper.update()
			const state = wrapper.instance().state

			expect(state.result.name).toBe('Mockville')
			expect(state.result.main.temp).toBe(297)
			expect(state.result.weather[0].description).toBe('all good!')
			expect(state.result.weather[0].id).toBe(100)
			expect(state.result.dt).toBe(2)
			expect(state.result.sys.sunrise).toBe(1)
			expect(state.result.sys.sunset).toBe(3)

			done()
		})

	})

})

// describe('<NoGeo> displayed on mount with geolocation disabled', () => {

// 	jest.mock('geolocationForceError')

// 	it('sets noGeoLocation in state and renders <NoGeo> template', done => {
// 		const wrapper = shallow(<LookupByGeoloc />)

// 		setTimeout(() => {
// 			wrapper.update()
// 			const state = wrapper.instance().state

// 			expect(state.noGeoLocation).toBe(true)
// 			expect(wrapper.find(NoGeo).length).toBe(1)

// 			done()
// 		})
// 	})

// })
