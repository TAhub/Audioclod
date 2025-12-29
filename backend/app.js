const express = require('express')
const app = express()
app.use(express.json())
app.use('/api/users', require('./controllers/users'))
app.use('/api/login', require('./controllers/login'))
module.exports = app
