const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const { User } = require('../models')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  if (!username) {
    return response.status(401).send({ error: 'No username provided.' })
  }
  if (!password) {
    return response.status(401).send({ error: 'No password provided.' })
  }
  const user = await User.findOne({ where: { username } })
  if (!user) {
    return response.status(401).send({ error: 'Invalid username or password.' })
  }
  if (!(await bcrypt.compare(password, user.passwordHash))) {
    return response.status(401).send({ error: 'Invalid username or password.' })
  }
  const token = jwt.sign({ id: user.id, username }, config.TOKEN_SECRET)
  response.status(200).send({ token, username, admin: user.admin })
})

module.exports = loginRouter
