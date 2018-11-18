import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import Search from '../../components/ui/Search'

describe('<Search /> rendering', () => {

	it('renders without crashing', () => {
	  	const div = document.createElement('div')
	  	ReactDOM.render(<Search />, div)
	  	ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(<Search />)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

})
