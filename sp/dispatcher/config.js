module.exports = {
	desk: {
		port: 65335
	},

	prompt: {
		host: 'http://217.76.52.255:20000',
		//host: 'http://127.0.0.1:20000',
		greeting: 'welcome ...',

		credentials: {
			accesskey: '444001',
			password: '550c72ee-26c3-4540-ad8d-45ab3e98b201',
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