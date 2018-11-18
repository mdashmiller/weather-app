import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import Button from '../../components/ui/Button'

describe('<Button> rendering', () => {

	it('renders without crashing', () => {
	  	const div = document.createElement('div')
	  	ReactDOM.render(<Button>Test</Button>, div)
	  	ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<Button>Test</Button>
		)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

})
