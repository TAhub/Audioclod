const express = require('express')
const app = express()
app.use(express.json())
app.use('/api/users', require('./controllers/users'))
module.exports = app
