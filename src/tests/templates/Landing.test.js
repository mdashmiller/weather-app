import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link } from 'react-router-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Landing from '../../components/templates/Landing'
import Frame from '../../components/ui/Frame'
import Search from '../../components/ui/Search'
import Title from '../../components/ui/Title'

Enzyme.configure({ adapter: new Adapter() })

describe('<Landing /> rendering', () => {

	it('renders without crashing', () => {
	    const div = document.createElement('div')
	    ReactDOM.render(
	        <BrowserRouter>
	  		    <Landing />
	  	   </BrowserRouter>,
	  	div)
	    ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<BrowserRouter>
				<Landing />
			</BrowserRouter>
		)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('renders 1 <Frame> component', () => {
		const wrapper = shallow(<Landing />)
		expect(wrapper.find(Frame).length).toBe(1)
	})

	it('renders 1 <Title> component', () => {
		const wrapper = shallow(<Landing />)
		expect(wrapper.find(Title).length).toBe(1)
	})

	it('renders 2 <Link> elements', () => {
		const wrapper = shallow(<Landing />)
		expect(wrapper.find(Link).length).toBe(2)
	})

	it('renders 2 <Search> components', () => {
		const wrapper = shallow(<Landing />)
		expect(wrapper.find(Search).length).toBe(2)
	})

})

describe('<Landing> Link functionality', () => {

	it('contains a link to get weather by geolocation', () => {
		const wrapper = shallow(<Landing />)
		expect(wrapper.find(Link).at(0).prop('to')).toBe('/lookup-by-geoloc')
	})

	it('contains a link to get weather by zipcode', () => {
		const wrapper = shallow(<Landing />)
		expect(wrapper.find(Link).at(1).prop('to')).toBe('/lookup-by-zip')
	})

})
