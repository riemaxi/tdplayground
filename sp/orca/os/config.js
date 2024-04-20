module.exports= {
    prompt: {
		host: 'http://217.76.52.255:20000',
		//host: 'http://127.0.0.1:20000',

		credentials: {
			accesskey: '505152',
			password: 'ff0f0d8a-4d86-4c2c-900e-1816e11f5418',
			address: 'os.orca.4da'
		},

		peers: {
		}
	},

	handler: {
		access: {
			path: './data/access.json'
		},

		library: {
			path: './data/library.json'
		},

		notification: {
			path: './data/notification.json'
		}
	}

}