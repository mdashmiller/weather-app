import React from 'react'
import Frame from '../components/Frame'
import Search from '../components/Search'
import Lookup from './Lookup'

const Landing = ({
	dayOrNight,
	dayOrNight2,
	searchClicked,
	getWeather,
	handleZip,
	limitInputChars,
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
        	? <Lookup 
        		getWeather={getWeather}
        		handleZip={handleZip}
        		limitInputChars={limitInputChars}
        	/>
        	: <div>
        		<Search
        			type="text"
        			placeholder="&#xf3c5;  Use My Location"
        			onClick={getLocation}
        			landingPage
        			userLocation
        		/>
        		<Search
        			placeholder="&#xf002;  Lookup by Zip"
        			onClick={switchToLookup}
        			landingPage
        			userZip
        		/>
        	</div>
        }
    </Frame>

export default Landing
