import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import WeatherIcon from '../../components/ui/WeatherIcon'
import Icon from '../../components/ui/Icon'

Enzyme.configure({ adapter: new Adapter })

describe('<WeatherIcon /> rendering', () => {

	it('renders without crashing', () => {
	  	const div = document.createElement('div')
	  	ReactDOM.render(<WeatherIcon />, div)
	  	ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(<WeatherIcon />)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

})

describe('<WeatherIcon /> displays proper className for each condition code', () => {

	it('has className {cloud} when it receives a cloudy weather code', () => {
		let wrapper = shallow(<WeatherIcon code={960} />)
		expect(wrapper.find(Icon).prop('className')).toBe('fas fa-cloud fa-3x')
		wrapper = shallow(<WeatherIcon code={900} />)
		expect(wrapper.find(Icon).prop('className')).toBe('fas fa-cloud fa-3x')
		wrapper = shallow(<WeatherIcon code={804} />)
		expect(wrapper.find(Icon).prop('className')).toBe('fas fa-cloud fa-3x')
		wrapper = shallow(<WeatherIcon code={803} />)
		expect(wrapper.find(Icon).prop('className')).toBe('fas fa-cloud fa-3x')
		wrapper = shallow(<WeatherIcon code={760} />)
		expect(wrapper.find(Icon).prop('className')).toBe('fas fa-cloud fa-3x')
		wrapper = shallow(<WeatherIcon code={600} />)
		expect(wrapper.find(Icon).prop('className')).toBe('fas fa-cloud fa-3x')
		wrapper = shallow(<WeatherIcon code={500} />)
		expect(wrapper.find(Icon).prop('className')).toBe('fas fa-cloud fa-3x')
		wrapper = shallow(<WeatherIcon code={310} />)
		expect(wrapper.find(Icon).prop('className')).toBe('fas fa-cloud fa-3x')
		wrapper = shallow(<WeatherIcon code={210} />)
		expect(wrapper.find(Icon).prop('className')).toBe('fas fa-cloud fa-3x')
	})

	it('displays the proper celestial body when it receives a clear weather code', () => {
		let wrapper = shallow(<WeatherIcon code={199} day={true} />)
		expect(wrapper.find(Icon).prop('className')).toBe('fas fa-sun fa-3x')
		wrapper = shallow(<WeatherIcon code={199} day={false} />)
		expect(wrapper.find(Icon).prop('className')).toBe('fas fa-moon fa-3x')
	})

})
