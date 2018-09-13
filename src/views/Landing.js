import React from 'react'
import Frame from '../components/Frame'
import Search from '../components/Search'
import Button from '../components/Button'
import Lookup from './Lookup'

const Landing = ({
	dayOrNight,
	dayOrNight2,
	searchClicked,
	//lookUpByZip,
	getLocation,
	switchToLookup
}) =>
	<Frame>
        <h1
        	id="landing-title"
        	className={dayOrNight}
        >
        	Weather
    	    <span
    	    	className={dayOrNight2}
    	    >
    	    	Now
    	    </span>
        </h1>
        {searchClicked
        	// if user clicks the look up by zipcode
        	// option, show the Lookup view, else
        	// show the standard landing view
        	? <Lookup /*lookUpByZip={lookUpByZip}*/ />
        	: <div>
        		<Search
        			type="text"
        			placeholder="Use My Location"
        			onClick={getLocation}
        			landingPage
        			userLocation
        		/>
        		<Search
        			placeholder="Lookup by Zipcode"
        			onClick={switchToLookup}
        			landingPage
        			userZip
        		/>
        	</div>
        }
    </Frame>

export default Landing
