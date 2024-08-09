const keys = require('./accesskeys.json')

let key = keys[Math.floor(Math.random() * keys.length)]

console.log('credentials:', key)

