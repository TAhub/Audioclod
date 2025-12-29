const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const { User } = require('../models')
const middleware = require('../utils/middleware')

usersRouter.get('/', async (request, response) => {
  const users = await User.findAll()
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  if (!username) {
    return response.status(400).send({ error: 'No username provided.' })
  }
  if (!password) {
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

usersRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const id = parseInt(request.params.id)
  if (request.user.id === id || request.user.admin) {
    try {
      if (request.user.id === id) {
        await request.user.destroy()
      } else {
        const user = await User.findByPk(id)
        if (!user) {
          return response.status(400).send({ error: 'That user does not exist.' })
        }
        await user.destroy()
      }
      return response.status(204).end()
    } catch (error) {
      // TODO: interpret any specific errors
      return response.status(400).json(error)
    }
  } else {
    return response.status(403).send({ error: 'Lacking permission to delete user.' })
  }
})

module.exports = usersRouter
