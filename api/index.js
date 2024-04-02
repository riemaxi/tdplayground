const express = require("express");
const app = express();
app.use(express.static('desktop'))

//app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;