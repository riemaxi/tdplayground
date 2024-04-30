const xpr = require('express')
const app = xpr()
app.use(xpr.static('./public'))

app.listen(8781, () => console.log('ready'))


