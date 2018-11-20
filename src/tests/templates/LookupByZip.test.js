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

	beforeEach(() => {
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

})

describe('<Search> functionality with no weather data', () => {

	// can't get this one to work
	// it('calls handleZip() with user input', () => {
	// 	const handleZip = jest.fn()
	// 	const wrapper = shallow(<LookupByZip onChange={handleZip} />)
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

	// it('calls clearError() with user click', () => {
		
	// })

	it('clears error from state with user click', () => {
		const clearError = jest.fn()
		const wrapper = shallow(<LookupByZip />)
		wrapper.setState({ error: {} })
		wrapper.find(Search).simulate('click')
		expect(wrapper.state('error')).toBe(null)
	})

})
