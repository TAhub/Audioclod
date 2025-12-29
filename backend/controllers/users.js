const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const { User } = require('../models')

usersRouter.get('/', async (request, response) => {
  const users = await User.findAll()
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  if (username === undefined) {
    return response.status(400).send({ error: 'No username provided.' })
  }
  if (password === undefined) {
    return response.status(400).send({ error: 'No password provided.' })
  }
  // TODO: do validation on password (length, etc)
  const passwordHash = await bcrypt.hash(password, config.PASSWORD_HASH_SALT_ROUNDS)
  try {
    const result = await User.create({ username, passwordHash })
    return response.status(201).json(result)
  } catch (error) {
    // TODO: interpret any specific errors
    return response.status(400).json(error)
  }
})

module.exports = usersRouter
