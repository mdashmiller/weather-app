import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ErrorMsg from '../../components/templates/ErrorMsg'

Enzyme.configure({ adapter: new Adapter() })

describe('<ErrorMsg /> rendering', () => {

	it('renders without crashing', () => {
	  const div = document.createElement('div')
	  ReactDOM.render(<ErrorMsg />, div)
	  ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(<ErrorMsg />)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('renders 1 div', () => {
		const wrapper = shallow(<ErrorMsg />)
		expect(wrapper.find('div').length).toBe(1)
	})

	it('renders 2 h2', () => {
		const wrapper = shallow(<ErrorMsg />)
		expect(wrapper.find('h2').length).toBe(2)
	})	

})
