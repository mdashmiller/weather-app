// allows geolocation to return coordinates for each test
const mockGeolocation = {
	getCurrentPosition: jest.fn(success => Promise.resolve(success({
  		coords: {
  			latitude: 29.8,
  			longitude: 95.4
  		}
	})))
}

global.navigator.geolocation = mockGeolocation

// mocks a call to the openWeatherMap API
const fakeResponse = { name: 'Mock Town' }
const mockJsonPromise = Promise.resolve(fakeResponse)

const mockFetch = jest.fn().mockImplementation(() => Promise.resolve({
	json: () => mockJsonPromise
}))

global.fetch = mockFetch
