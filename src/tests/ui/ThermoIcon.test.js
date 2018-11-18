import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ThermoIcon from '../../components/ui/ThermoIcon'
import Icon from '../../components/ui/Icon'

Enzyme.configure({ adapter: new Adapter })

describe('<ThermoIcon /> rendering', () => {

	it('renders without crashing', () => {
	  	const div = document.createElement('div')
	  	ReactDOM.render(<ThermoIcon />, div)
	  	ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(<ThermoIcon />)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

})

describe('<ThermoIcon /> displays proper className for each temp category', () => {

	// icon varieties
	const thermoHot = "fas fa-thermometer-full fa-3x"
	const thermoWarm = "fas fa-thermometer-three-quarters fa-3x"
	const thermoCool = "fas fa-thermometer-half fa-3x"
	const thermoCold = "fas fa-thermometer-empty fa-3x"

	it('has className {thermoCool} when temp > 32 && temp < 69', () => {
		const wrapper = shallow(<ThermoIcon temp={50} />)
		expect(wrapper.find(Icon).prop('className')).toBe('fas fa-thermometer-half fa-3x')
	})

	it('has className {thermoWarm} when temp >= 69 && temp < 86', () => {
		const wrapper = shallow(<ThermoIcon temp={75} />)
		expect(wrapper.find(Icon).prop('className')).toBe('fas fa-thermometer-three-quarters fa-3x')
	})

	it('has className {thermoHot} when temp >= 86', () => {
		const wrapper = shallow(<ThermoIcon temp={90} />)
		expect(wrapper.find(Icon).prop('className')).toBe('fas fa-thermometer-full fa-3x')
	})

	it('has className {thermoCold} when there is no temp prop', () => {
		const wrapper = shallow(<ThermoIcon />)
		expect(wrapper.find(Icon).prop('className')).toBe('fas fa-thermometer-empty fa-3x')
	})

})
