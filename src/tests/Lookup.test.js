import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { spy } from 'sinon'
import { expect } from 'chai'

import Lookup from '../views/Lookup'
import Search from '../components/Search'
import Button from '../components/Button'

Enzyme.configure({ adapter: new Adapter() })

describe('<Lookup />', () => {

	it('renders 1 <Search /> component', () => {
		const wrapper = shallow(<Lookup />)
		expect(wrapper.find(Search)).to.have.lengthOf(1)
	})

	it('renders 1 <Button /> component', () => {
		const wrapper = shallow(<Lookup />)
		expect(wrapper.find(Button)).to.have.lengthOf(1)
	})

	it('simulates click events', () => {
	    const onButtonClick = spy()
	    const wrapper = shallow(<Lookup getWeather={onButtonClick} />)
	    wrapper.find(Button).simulate('click')
	    expect(onButtonClick).to.have.property('callCount', 1)
	  })

})
