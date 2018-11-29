const mockGeolocation = {
	getCurrentPosition: jest.fn(success => Promise.resolve(success({
  		coords: {
  			latitude: 29.8,
  			longitude: 95.4
  		}
	})))
}

global.navigator.geolocation = mockGeolocation
