const axios = require('axios').default

let url = 'http://38.242.157.162:33390/accesskey'

axios.get(url).then(r => console.log('credentials:', r.data))



