const express = require('express')
const app = express()
app.use(express.json())
app.use(require('./utils/middleware').tokenExtractor)
app.use('/api/users', require('./controllers/users'))
app.use('/api/login', require('./controllers/login'))
app.use('/api/assets', require('./controllers/assets'))
module.exports = app
