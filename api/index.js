const express = require("express")
const app = express()
app.use(express.static('public'))

app.get('/lola', (req, res) => res.send('testting lola request'))

//app.listen(3000, () => console.log("Server ready on port 3000."))

module.exports = app