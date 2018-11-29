const mockGeolocation = {
	getCurrentPosition: jest.fn(success => Promise.resolve(success({
  		coords: {
  			latitude: 29.8,
  			longitude: 95.4
  		}
	})))
}

global.navigator.geolocation = mockGeolocation

const mockFetch = jest.fn(() => Promise.resolve({
	name: 'New Test Town'
}))

global.fetch = mockFetch

// const mockFetch = Promise.resolve({
// 	json: () => Promise.resolve({Rick: `I turned myself into a pickle, Morty!`}),
// })

// global.fetch = () => mockFetch
