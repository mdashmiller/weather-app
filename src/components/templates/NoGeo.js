import React from 'react'
import { Link } from 'react-router-dom'
import Frame from '../ui/Frame'
import Title from '../ui/Title'
import Search from '../ui/Search'

const NoGeo = () =>
	<Frame>
		<Title />
		<h2>It looks like geolocation is disabled.</h2>
		<h2>Would you like to search for weather by zipcode?</h2>
		<Link to='/lookup-by-zip'>
			<Search
				type="text"
				placeholder="&#xf002; Lookup By Zip"
				noGeo
				lookUp
			/>
		</Link>
	</Frame>

export default NoGeo
