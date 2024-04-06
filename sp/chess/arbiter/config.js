module.exports= {
    prompt: {
		host: 'http://217.76.52.255:20000',
		//host: 'http://127.0.0.1:20000',

		credentials: {
			accesskey: '200010',
			password: 'c726db88-9eef-4941-93f5-e81bead31eff',
			address: 'arbiter.chess.playground.4da'
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