import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './components/Landing'
import LookupByGeoloc from './components/LookupByGeoloc'
import LookupByZip from './components/LookupByZip'

const App = () => 
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Landing} />
			<Route path='/lookup-by-geoloc' component={LookupByGeoloc} />
			<Route path='/lookup-by-zip' component={LookupByZip} />
		</Switch>
	</BrowserRouter>
	
export default App
