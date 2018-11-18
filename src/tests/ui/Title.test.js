import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BrowserRouter, Link } from 'react-router-dom'

import Title from '../../components/ui/Title'

Enzyme.configure({ adapter: new Adapter() })

describe('<Title /> rendering', () => {

	it('renders without crashing', () => {
	  	const div = document.createElement('div')
	  	ReactDOM.render(
	  		<BrowserRouter>
	  			<Title />
	  		</BrowserRouter>
	  	, div)
	  	ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<BrowserRouter>
				<Title />
			</BrowserRouter>
		)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('renders 1 <Link> component', () => {
		const wrapper = shallow(<Title />)
		expect(wrapper.find(Link).length).toBe(1)
	})

	it('renders 1 <h1> element', () => {
		const wrapper = shallow(<Title />)
		expect(wrapper.find('h1').length).toBe(1)
	})

	it('renders 1 <span> element', () => {
		const wrapper = shallow(<Title />)
		expect(wrapper.find('span').length).toBe(1)
	})

})

describe('<Title /> Link functionality', () => {
	
	it('contains a <Link> to "/"', () => {
		const wrapper = shallow(<Title />)
		expect(wrapper.find(Link).prop('to')).toBe('/')
	})

})
