import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BrowserRouter, Link } from 'react-router-dom'

import LookupByZip from '../../components/templates/LookupByZip'
import Frame from '../../components/ui/Frame'
import Title from '../../components/ui/Title'
import Search from '../../components/ui/Search'
import Button from '../../components/ui/Button'
import Weather from '../../components/templates/Weather'

Enzyme.configure({ adapter: new Adapter() })

// fake data from API call
const result = {
	name: 'Test City',
	main: {
		temp: 297
	},
	weather: [
		{
			description: 'all good!',
			id: 100
		}
	],
	dt: 2,
	sys: {
		sunrise: 1,
		sunset: 3
	}
}

describe('<LookupByZip /> basic rendering', () => {

	it('renders without crashing', () => {
	  	const div = document.createElement('div')
	  	ReactDOM.render(
	  		<BrowserRouter>
	  			<LookupByZip />
	  		</BrowserRouter>,
	  	div)
	  	ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<BrowserRouter>
				<LookupByZip />
			</BrowserRouter>
		)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

})

describe('<LookupByZip /> rendering when there is no weather data', () => {

	let wrapper

	beforeEach(() => {
		wrapper = shallow(<LookupByZip />)
	})

	it('renders 1 <Frame> component', () => {
		expect(wrapper.find(Frame).length).toBe(1)
	})

	it('renders 1 <Title> component', () => {
		expect(wrapper.find(Title).length).toBe(1)
	})

	it('renders 1 <Search> component', () => {
		expect(wrapper.find(Search).length).toBe(1)
	})

	it('renders 1 <i> element when there is no error and the button has been clicked', () => {
		wrapper.setState({ searchClicked: true })

		expect(wrapper.find('i').length).toBe(1)
	})

	it('renders 1 <Button> component when there is an error or the button has not been clicked', () => {
		wrapper.setState({ error: {} })

		expect(wrapper.find(Button).length).toBe(1)
	})

	it('renders 1 <div> #error when the user enters a bad zip', () => {
		wrapper.setState({
			result: {
				cod: 'error'
			}
		})

		expect(wrapper.find('div').length).toBe(1)
		expect(wrapper.find('div').prop('id')).toBe('error')
	})

	it('renders 2 <h2> elements when the user enters a bad zip', () => {
		wrapper.setState({
			result: {
				cod: 'error'
			}
		})

		expect(wrapper.find('h2').length).toBe(2)
	})

})

describe('<LookupByZip /> rendering when there is weather data', () => {

	let wrapper

	beforeAll(() => {
		wrapper = shallow(<LookupByZip />)
		wrapper.setState({ result })
	})

	it('renders 1 <Frame> component', () => {
		expect(wrapper.find(Frame).length).toBe(1)
	})

	it('renders 1 <Weather> component', () => {
		expect(wrapper.find(Weather).length).toBe(1)
	})

	it('renders 2 <Search> components', () => {
		expect(wrapper.find(Search).length).toBe(2)
	})

	it('renders 1 <Link>', () => {
		expect(wrapper.find(Link).length).toBe(1)
	})

})

describe('<Search> functionality with no weather data', () => {

	let wrapper
	let instance

	beforeEach(() => {
		wrapper = shallow(<LookupByZip />)
		instance = wrapper.instance()
	})

	it('calls handleZip() with user input', () => {
		jest.spyOn(instance, 'handleZip')
		wrapper.find(Search).simulate('change', { target: { value: '12345' } })

		expect(instance.handleZip).toHaveBeenCalled()
	})

	it('updates zip in state with user input', () => {
		wrapper.find(Search).simulate('change', { target: { value: '12345' } })

		expect(wrapper.state('zip')).toBe('12345')
	})

	it('calls handleKeyPress() when user types', () => {
		document.getSelection = jest.fn().mockReturnValue('')
		const event = {
			target: { value: 9021 },
			key: '0',
			preventDefault: jest.fn()
		}

		jest.spyOn(instance, 'handleKeyPress')
		wrapper.find(Search).simulate('keypress', event)

		expect(instance.handleKeyPress).toHaveBeenCalled()
	})

	it('calls clearError() with user click', () => {
		jest.spyOn(instance, 'clearError')
		wrapper.find(Search).simulate('click')

		expect(instance.clearError).toHaveBeenCalled()
	})

	it('clears error from state with user click', () => {
		wrapper.setState({ error: { message: 'error' } })

		wrapper.find(Search).simulate('click')

		expect(wrapper.state('error')).toBe(null)
	})

	it('has #error-box when user enters a bad zip', () => {
		wrapper.setState({
			result: {
				cod: 'error'
			}
		})

		expect(wrapper.find(Search).prop('id')).toBe('error-box')
	})

})

describe('<Button> functionality with no weather data', () => {

	it('calls handleClick() when clicked', () => {
		const wrapper = shallow(<LookupByZip />)
		const instance = wrapper.instance()

		jest.spyOn(instance, 'handleClick')
		wrapper.find(Button).simulate('click')

		expect(instance.handleClick).toHaveBeenCalled()
	})

})

describe('<LookupByZip> Link functionality when there is weather data', () => {

	it('contains a link to get weather by geolocation', () => {
		const wrapper = shallow(<LookupByZip />)
		wrapper.setState({ result })

		expect(wrapper.find(Link).prop('to')).toBe('/lookup-by-geoloc')
	})

})

describe('<Search> functionality when there is weather data', () => {

	it('calls clearWeather when clicked', () => {
		const wrapper = shallow(<LookupByZip />)
		const instance = wrapper.instance()
		wrapper.setState({ result })

		jest.spyOn(instance, 'clearWeather')
		wrapper.find(Search).at(0).simulate('click')

		expect(instance.clearWeather).toHaveBeenCalled()
	})

	it('clears result and error from state when clicked', () => {
		const wrapper = shallow(<LookupByZip />)
		wrapper.setState({ result })

		wrapper.find(Search).at(0).simulate('click')

		expect(wrapper.state('result')).toEqual({})

		wrapper.setState({
			error: {
				message: 'error'
			}
		})

		wrapper.find(Search).at(0).simulate('click')

		expect(wrapper.state('error')).toEqual(null)
	})

})

describe('directly invoking handleZip', () => {

	it('sets zip in state with user input', () => {
		const wrapper = shallow(<LookupByZip />)
		const instance = wrapper.instance()
		const value = {
			target: {
				value: '12345'
			}
		}

		instance.handleZip(value)

		expect(wrapper.state('zip')).toBe('12345')
	})

})

describe('invoking handleKeyPress', () => {

	let wrapper
	let instance

	beforeEach(() => {
		wrapper = shallow(<LookupByZip />)
		instance = wrapper.instance()
		document.getSelection = jest.fn().mockReturnValue('')
	})

	it('calls getWeather() when user presses "Enter"', () => {
		const event = {
			target: { value: 90210 },
			key: 'Enter'
		}

		jest.spyOn(instance, 'getWeather')
		instance.handleKeyPress(event)

		expect(instance.getWeather).toHaveBeenCalled()
	})

	it('returns if there are >5 chars and user enters [0-9]', () => {
		const event = {
			target: { value: 9021 },
			key: '0',
			preventDefault: jest.fn()
		}

		jest.spyOn(instance, 'handleKeyPress')
		wrapper.find(Search).simulate('keypress', event)

		expect(instance.handleKeyPress).toHaveReturned()
		// expect(event.preventDefault).not.toHaveBeenCalled()
	})

	it('allows replacement of highlighted chars with [0-9]', () => {
		document.getSelection = jest.fn().mockReturnValue('12345')
		const event = {
			target: { value: 12345 },
			key: '0',
			preventDefault: jest.fn()
		}

		jest.spyOn(instance, 'handleKeyPress')
		wrapper.find(Search).simulate('keypress', event)

		expect(instance.handleKeyPress).toHaveReturned()
		expect(event.preventDefault).not.toHaveBeenCalled()
	})

	it('calls preventDefault if chars are highlighted and user enters != [0-9]', () => {
		document.getSelection = jest.fn().mockReturnValue('12345')
		const event = {
			target: { value: 12345 },
			key: 'a',
			preventDefault: jest.fn()
		}

		wrapper.find(Search).simulate('keypress', event)

		expect(event.preventDefault).toHaveBeenCalled()
	})

	it('calls e.preventDefault if user enters anything except [0-9]', () => {
		const event = {
			target: { value: 9021 },
			key: 'a',
			preventDefault: jest.fn()
		}

		wrapper.find(Search).simulate('keypress', event)

		expect(event.preventDefault).toHaveBeenCalled()
	})

	it('returns if there are five chars and user presses an acceptable key', () => {
		const event = {
			target: { value: 90210 },
			key: 'Tab',
			preventDefault: jest.fn()
		}

		jest.spyOn(instance, 'handleKeyPress')
		wrapper.find(Search).simulate('keypress', event)

		expect(instance.handleKeyPress).toHaveReturned()
		expect(event.preventDefault).not.toHaveBeenCalled()
	})

	it('calls e.preventDefault if there and five chars and user presses a forbidden key', () => {
		const event = {
			target: { value: 90210 },
			key: '1',
			preventDefault: jest.fn()
		}

		wrapper.find(Search).simulate('keypress', event)

		expect(event.preventDefault).toHaveBeenCalled()
	})

})

describe('directly invoking clearError()', () => {

	it('sets state in order to ready the form for a new zip', () => {
		const wrapper = shallow(<LookupByZip />)
		const instance = wrapper.instance()
		wrapper.setState({
			error: {
				message: 'error'
			},
			searchClicked: true
		})

		instance.clearError()

		expect(wrapper.state('error')).toBe(null)
		expect(wrapper.state('searchClicked')).toBe(false)
	})

})

describe('directly invoking handleClick()', () => {

	it('calls startSpinner() and getWeather()', () => {
		const wrapper = shallow(<LookupByZip />)
		const instance = wrapper.instance()

		jest.spyOn(instance, 'startSpinner')
		jest.spyOn(instance, 'getWeather')
		instance.handleClick()

		expect(instance.startSpinner).toHaveBeenCalled()
		expect(instance.getWeather).toHaveBeenCalled()
	})

})

describe('directly invoking startSpinner()', () => {

	it('sets searchClicked in state to true', () => {
		const wrapper = shallow(<LookupByZip />)
		const instance = wrapper.instance()

		instance.startSpinner()

		expect(wrapper.state('searchClicked')).toBe(true)
	})

})

describe('directly invoking getWeather()', () => {

	jest.mock('../../services/openWeatherMap')

	it('sets the result in state', done => {
		const wrapper = shallow(<LookupByZip />)
		const instance = wrapper.instance()

		jest.spyOn(instance, 'setWeatherInfo')
		instance.getWeather()

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
			expect(instance.setWeatherInfo).toHaveBeenCalled()

			done()
		})
	})

})

describe('directly invoking setWeatherInfo()', () => {

	it('sets state correctly with a successful call', () => {
		const wrapper = shallow(<LookupByZip />)
		const instance = wrapper.instance()
		// const result = {
		// 	name: 'Testopia'
		// }
		wrapper.setState({
			zip: '12345',
			searchClicked: true
		})

		instance.setWeatherInfo(result)

		expect(wrapper.state('result')).toEqual(result)
		expect(wrapper.state('zip')).toBe('')
		expect(wrapper.state('searchClicked')).toBe(false)
	})

	it('sets state correctly with a bad zip', () => {
		const wrapper = shallow(<LookupByZip />)
		const instance = wrapper.instance()
		const error = {
			cod: 'error'
		}
		wrapper.setState({
			zip: '99999',
			searchClicked: true
		})

		instance.setWeatherInfo(error)

		expect(wrapper.state('result')).toEqual(error)
		expect(wrapper.state('zip')).toBe('99999')
		expect(wrapper.state('searchClicked')).toBe(false)	
	})

})

describe('directly invoking clearWeather()', () => {

	it('sets state in preparation for a fresh API call', () => {
		const wrapper = shallow(<LookupByZip />)
		const instance = wrapper.instance()
		wrapper.setState({
			result: {
				name: 'Testview'
			},
			error: {
				message: 'some error'
			}
		})

		instance.clearWeather()
		
		expect(wrapper.state('result')).toEqual({})
		expect(wrapper.state('error')).toBe(null)
	})

})
