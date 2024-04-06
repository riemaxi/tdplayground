module.exports= {
    prompt: {
		host: 'http://217.76.52.255:20000',
		//host: 'http://127.0.0.1:20000',

		credentials: {
			accesskey: '200005',
			password: 'a30ca15b-b318-4095-a776-14f9e61f53b1',
			address: 'chess.playground.4da'
		},

		peers: {
			hub: 'gamya.playground.4da'
		}
	},

	data: {
		state: {
			path: './data/state.json',
			default: './data/default.json'
		}
	}


}