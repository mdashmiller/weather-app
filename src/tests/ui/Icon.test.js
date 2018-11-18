import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import Icon from '../../components/ui/Icon'

describe('<Icon> rendering', () => {

	it('renders without crashing', () => {
	  	const div = document.createElement('div')
	  	ReactDOM.render(<Icon>Test</Icon>, div)
	  	ReactDOM.unmountComponentAtNode(div)
	})

	// test('has a valid snapshot', () => {
	// 	const component = renderer.create(
	// 		<Icon>Test</Icon>
	// 	)
	// 	let tree = component.toJSON()
	// 	expect(tree).toMatchSnapshot()
	// })

})
