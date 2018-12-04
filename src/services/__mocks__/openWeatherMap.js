const fakeResponse = {
	name: 'Mockville',
	main: {
		temp: 297
	},
	weather: [
		{
			description: 'all good!',
			id: 100
		}
	],
	dt: 2,
	sys: {
		sunrise: 1,
		sunset: 3
	}
}

const mockJsonPromise = Promise.resolve(fakeResponse)

export default (lat, lon, zip) => Promise.resolve({
	json: () => mockJsonPromise	
})
