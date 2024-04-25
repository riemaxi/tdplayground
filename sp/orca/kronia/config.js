module.exports= {
    prompt: {
		host: 'http://217.76.52.255:20000',
		//host: 'http://127.0.0.1:20000',

		credentials: {
			accesskey: '202030',
			password: 'c125d75a-0d1c-4673-a433-89380e612c86',
			address: 'kronia.orca.playground.4da'
		},

		peers: {
			access: {
				address: 'os.orca.4da',
				interval: 20000,
				action: 12
			},

			repository: {
				address: 'os.orca.4da',
				interval: 10000,
				action: 34
			}

		}

	}
}