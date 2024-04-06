module.exports= {
    prompt: {
		host: 'http://217.76.52.255:20000',
		//host: 'http://127.0.0.1:20000',

		credentials: {
			accesskey: '200013',
			password: 'f1f0d421-d550-4c3a-a1fc-b56dbc93227d',
			address: 'utility.chess.playground.4da'
		},

		peers: {
			hub: 'gamya.playground.4da'
		}
	},

	data: {
		piece: {
			path: './data/pieces.json',
		},

		board: {
			path: './data/boards.json',
		},

		clock: {
			path: './data/clocks.json',
		},

		theme: {
			path: './data/themes.json',
		},

		combo: {
			path: './data/combos.json',
		}

	}


}