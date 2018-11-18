import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import Frame from '../../components/ui/Frame'

describe('<Frame> rendering', () => {

	it('renders without crashing', () => {
	  	const div = document.createElement('div')
	  	ReactDOM.render(<Frame>Test</Frame>, div)
	  	ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<Frame>Test</Frame>
		)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

})
