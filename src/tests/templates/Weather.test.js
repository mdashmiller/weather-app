import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Weather from '../../components/templates/Weather'
import WeatherIcon from '../../components/ui/WeatherIcon'
import ThermoIcon from '../../components/ui/ThermoIcon'

Enzyme.configure({ adapter: new Adapter() })

// fake weather API data
const result = {
	name: 'Testville',
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

describe('<Weather /> rendering', () => {

	it('renders without crashing', () => {
	  	const div = document.createElement('div')
	  	ReactDOM.render(<Weather result={result} />, div)
	  	ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(<Weather result={result} />)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('renders 1 <div> element', () => {
		const wrapper = shallow(<Weather result={result} />)
		expect(wrapper.find('div').length).toBe(1)
	})

	it('renders 1 <h1> element', () => {
		const wrapper = shallow(<Weather result={result} />)
		expect(wrapper.find('h1').length).toBe(1)
	})

	it('renders 1 <h2> element', () => {
		const wrapper = shallow(<Weather result={result} />)
		expect(wrapper.find('h2').length).toBe(1)
	})

	it('renders 1 <h3> element', () => {
		const wrapper = shallow(<Weather result={result} />)
		expect(wrapper.find('h3').length).toBe(1)
	})

	it('renders 1 <WeatherIcon /> component', () => {
		const wrapper = shallow(<Weather result={result} />)
		expect(wrapper.find('WeatherIcon').length).toBe(1)
	})

	it('renders 1 <ThermoIcon /> component', () => {
		const wrapper = shallow(<Weather result={result} />)
		expect(wrapper.find('ThermoIcon').length).toBe(1)
	})

})

describe('directly invoking setWeatherInfo()', () => {

	it('calls the proper functions', () => {
		const wrapper = shallow(<Weather result={result} />)
		const instance = wrapper.instance()

		jest.spyOn(instance, 'setTemp')
		jest.spyOn(instance, 'setDescription')
		jest.spyOn(instance, 'setPlace')
		jest.spyOn(instance, 'setCondition')
		jest.spyOn(instance, 'dayOrNight')

		instance.setWeatherInfo(result)
		expect(instance.setTemp).toHaveBeenCalledWith(297)
		expect(instance.setDescription).toHaveBeenCalledWith('all good!')
		expect(instance.setPlace).toHaveBeenCalledWith('Testville')
		expect(instance.setCondition).toHaveBeenCalledWith(100)
		expect(instance.dayOrNight).toHaveBeenCalledWith(2, 1, 3)
	})

})

describe('directly invoking setTemp()', () => {

	it('calls convertToFahrenheit()', () => {
		const wrapper = shallow(<Weather result={result} />)
		const instance = wrapper.instance()
		jest.spyOn(instance, 'convertToFahrenheit')
		instance.setTemp(result.main.temp)
		expect(instance.convertToFahrenheit).toHaveBeenCalledWith(297)
	})	

	it('sets state with the proper value for temp', () => {
		const wrapper = shallow(<Weather result={result} />)
		const instance = wrapper.instance()
		instance.setTemp(result.main.temp)
		expect(wrapper.state('temp')).toBe('75.2')
	})

})

describe('directly invoking convertToFahrenheit()', () => {

	it('properly converts Kelvin to Fahrenheit', () => {
		const wrapper = shallow(<Weather result={result} />)
		const instance = wrapper.instance()
		jest.spyOn(instance, 'convertToFahrenheit')
		instance.convertToFahrenheit(0)
		expect(instance.convertToFahrenheit).toHaveReturnedWith('-459.4')
	})

})

describe('directly invoking setDescription()', () => {

	it('sets description property in state to result.weather[0].description', () => {
		const wrapper = shallow(<Weather result={result} />)
		const instance = wrapper.instance()
		instance.setDescription(result.weather[0].description)
		expect(wrapper.state('description')).toBe('all good!')
	})

})

describe('directly invoking setPlace()', () => {

	it('sets place property in state to result.name', () => {
		const wrapper = shallow(<Weather result={result} />)
		const instance = wrapper.instance()
		instance.setPlace(result.name)
		expect(wrapper.state('place')).toBe('Testville')
	})

})

describe('directly invoking setCondition()', () => {

	it('sets condition property in state to result.weather[0].id', () => {
		const wrapper = shallow(<Weather result={result} />)
		const instance = wrapper.instance()
		instance.setCondition(result.weather[0].id)
		expect(wrapper.state('condition')).toBe(100)
	})

})

describe('directly invoking dayOrNight()', () => {

	it('sets day property in state in relation to sunrise and sunset', () => {
		const wrapper = shallow(<Weather result={result} />)
		const instance = wrapper.instance()
		// time between sunrise and sunset
		instance.dayOrNight(2, 1, 3)
		expect(wrapper.state('day')).toBe(true)
		// time is after sunset
		instance.dayOrNight(3, 1, 2)
		expect(wrapper.state('day')).toBe(false)
		// time is equal to sunrise
		instance.dayOrNight(1, 1, 2)
		expect(wrapper.state('day')).toBe(true)
		// time is equal to sunset
		instance.dayOrNight(2, 1, 2)
		expect(wrapper.state('day')).toBe(false)
	})

})

describe('directly invoking componentDidMount()', () => {

	it('calls setWeatherInfo()', () => {
		const wrapper = shallow(<Weather result={result} />)
		const instance = wrapper.instance()
		jest.spyOn(instance, 'setWeatherInfo')
		instance.componentDidMount()
		expect(instance.setWeatherInfo).toHaveBeenCalledWith(result)
	})

})
