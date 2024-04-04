module.exports = {
	desk: {
		port: 65333
	},

	prompt: {
		host: 'http://217.76.52.255:20000',
		//host: 'http://127.0.0.1:20000',
		greeting: 'welcome ...',

		credentials: {
			accesskey: '444000',
			password: 'aa4ce880-e0f3-41d2-aa76-d97595ce718b',
			address: 'dispatcher.playground.local'
		},

		peers: {
			helloworld: 'helloworld.playground.4da',
			phone: 'phone.playground.4da',
			chess: 'chess.playground.4da',
			wallet: 'parec.playground.4da',
			gis : 'gis.playground.4da',
			parec: 'parec.playground.4da'
		},
	},

	data: {
			path: './data/list.json',
			state: './data/state'
	}
}