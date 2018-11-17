import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link } from 'react-router-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NoGeo from '../../components/templates/NoGeo'
import Frame from '../../components/ui/Frame'
import Title from '../../components/ui/Title'
import Search from '../../components/ui/Search'

Enzyme.configure({ adapter: new Adapter() })

describe('<NoGeo /> rendering', () => {

	it('renders without crashing', () => {
	  	const div = document.createElement('div')
	  	ReactDOM.render(
	        <BrowserRouter>
	  			<NoGeo />
	  	   	</BrowserRouter>,
	  	div)
	  	ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<BrowserRouter>
				<NoGeo />
		   	</BrowserRouter>
		)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('renders 1 <Frame> component', () => {
		const wrapper = shallow(<NoGeo />)
		expect(wrapper.find(Frame).length).toBe(1)
	})

	it('renders 1 <Title> component', () => {
		const wrapper = shallow(<NoGeo />)
		expect(wrapper.find(Title).length).toBe(1)
	})

	it('renders 2 h2 elements', () => {
		const wrapper = shallow(<NoGeo />)
		expect(wrapper.find('h2').length).toBe(2)
	})

	it('renders 1 <Link> component', () => {
		const wrapper = shallow(<NoGeo />)
		expect(wrapper.find(Link).length).toBe(1)
	})

	it('renders 1 <Search> component', () => {
		const wrapper = shallow(<NoGeo />)
		expect(wrapper.find(Search).length).toBe(1)
	})	

})

describe('<NoGeo /> Link functionality', () => {

	it('contains a link to get weather by zipcode', () => {
		const wrapper = shallow(<NoGeo />)
		expect(wrapper.find(Link).prop('to')).toBe('/lookup-by-zip')
	})

})
