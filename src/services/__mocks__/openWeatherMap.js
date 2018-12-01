const fakeData = {
	name: 'Mock Town'
}

export default async (lat, lon, zip) => {
	return await new Promise(resolve => {
		resolve(fakeData)
	})
}
