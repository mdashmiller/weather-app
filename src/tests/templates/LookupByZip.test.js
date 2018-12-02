import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BrowserRouter, Link } from 'react-router-dom'

import LookupByZip from '../../components/templates/LookupByZip'
import Frame from '../../components/ui/Frame'
import Title from '../../components/ui/Title'
import Search from '../../components/ui/Search'
import Button from '../../components/ui/Button'
import Weather from '../../components/templates/Weather'

Enzyme.configure({ adapter: new Adapter() })

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
		wrapper.setState({
			result: {
				name: 'Test City'
			}
		})
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

	// can't get this one to work
	// it('calls handleZip() with user input', () => {
	// 	const handleZip = jest.fn()
	// 	const wrapper = shallow(<LookupByZip />)
	// 	wrapper.find(Search).simulate('change', { target: { value: '12345' } })
	// 	expect(handleZip).toHaveBeenCalled()
	// })

	it('updates zip in state with user input', () => {
		const handleZip = jest.fn()
		const wrapper = shallow(<LookupByZip />)
		wrapper.find(Search).simulate('change', { target: { value: '12345' } })
		expect(wrapper.state('zip')).toBe('12345')
	})

	// 	says document.getSelection() is not a function
	// it('calls handleKeyPress() when user types', () => {
	// 	const handleKeyPress = jest.fn()
	// 	const wrapper = shallow(<LookupByZip handleKeyPress={handleKeyPress} />)
	// 	wrapper.find(Search).simulate('keypress', { target: { value: 37 } })
	// 	expect(handleKeyPress).toHaveBeenCalled()
	// })

	// // mock function was not called
	// it('calls clearError() with user click', () => {
	// 	const wrapper = shallow(<LookupByZip />)
	// 	const instance = wrapper.instance()
	// 	jest.spyOn(instance, 'clearError')
	// 	wrapper.find(Search).simulate('click')
	// 	expect(instance.clearError).toHaveBeenCalled()
	// })

	it('clears error from state with user click', () => {
		const wrapper = shallow(<LookupByZip />)
		wrapper.setState({ error: { message: 'error' } })
		wrapper.find(Search).simulate('click')
		expect(wrapper.state('error')).toBe(null)
	})

	it('has #error-box when user enters a bad zip', () => {
		const wrapper = shallow(<LookupByZip />)
		wrapper.setState({
			result: {
				cod: 'error'
			}
		})
		expect(wrapper.find(Search).prop('id')).toBe('error-box')
	})

})

// describe('<Button> functionality with no weather data', () => {

// 	// mock function is not called
// 	it('calls handleClick() when clicked', () => {
// 		const wrapper = shallow(<LookupByZip />)
// 		const instance = wrapper.instance()
// 		jest.spyOn(instance, 'handleClick')
// 		wrapper.find(Button).simulate('click')
// 		expect(instance.handleClick).toHaveBeenCalled()
// 	})

// })

describe('<LookupByZip> Link functionality when there is weather data', () => {

	it('contains a link to get weather by geolocation', () => {
		const wrapper = shallow(<LookupByZip />)
		wrapper.setState({
			result: {
				name: 'Testville'
			}
		})
		expect(wrapper.find(Link).prop('to')).toBe('/lookup-by-geoloc')
	})

})

describe('<Search> functionality when there is weather data', () => {

	// it('calls clearWeather when clicked', () => {

	// })

	it('clears result and error from state when clicked', () => {
		const wrapper = shallow(<LookupByZip />)
		wrapper.setState({
			result: {
				name: 'Testville'
			}
		})
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

// e.preventDefault is not a function
// describe('directly invoking handleKeyPress', () => {

// 	let e
// 	let preventDefault

// 	beforeEach(() => {
// 		document.getSelection = () => {
// 			return ''
// 		}
// 		e = {}
// 		preventDefault = jest.fn()
// 	})

// 	it('calls getWeather() when user presses "Enter"', () => {
// 		const wrapper = shallow(<LookupByZip />)
// 		const instance = wrapper.instance()
// 		const value1 = {
// 			target: {
// 				value: 13
// 			}
// 		}
// 		const value2 = {
// 			target: {
// 				value: 'Enter'
// 			}
// 		}
// 		jest.spyOn(instance, 'getWeather')
// 		instance.handleKeyPress(value1)
// 		expect(instance.getWeather).toHaveBeenCalledTimes(1)
// 		instance.handleKeyPress(value2)
// 		expect(instance.getWeather).toHaveBeenCalledTimes(2)
// 	})

// })

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

// describe('directly invoking getWeather()', () => {

//	jest.mock(openWeatherMap)

// 	it('', () => {
		
// 	})

// })

describe('directly invoking setWeatherInfo()', () => {

	it('sets state correctly with a successful call', () => {
		const wrapper = shallow(<LookupByZip />)
		const instance = wrapper.instance()
		const result = {
			name: 'Testopia'
		}
		wrapper.setState({
			zip: '12345',
			searchClicked: true
		})
		instance.setWeatherInfo(result)
		expect(wrapper.state('result')).toBe(result)
		expect(wrapper.state('zip')).toBe('')
		expect(wrapper.state('searchClicked')).toBe(false)
	})

	it('sets state correctly with a bad zip', () => {
		const wrapper = shallow(<LookupByZip />)
		const instance = wrapper.instance()
		const result = {
			cod: 'error'
		}
		wrapper.setState({
			zip: '99999',
			searchClicked: true
		})
		instance.setWeatherInfo(result)
		expect(wrapper.state('result')).toBe(result)
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
