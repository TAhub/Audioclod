const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { User } = require('../models')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (request, response, next) => {
  try {
    if (!request.token) {
      return response.status(401).send({ error: 'Authentication required.' })
    }
    const decodedToken = jwt.verify(request.token, config.TOKEN_SECRET)
    if (!decodedToken) {
      return response.status(401).send({ error: 'Invalid token.' })
    }
    const user = await User.findByPk(decodedToken.id)
    if (!user) {
      return response.status(401).send({ error: 'Invalid token.' })
    }
    if (user.username !== decodedToken.username) {
      return response.status(401).send({ error: 'Invalid token.' })
    }
    if (!user.active) {
      return response.status(403).send({ error: 'Deactivated users cannot take secure actions.' })
    }
    request.user = user
    next()
  } catch (error) {
    return response.status(401).send({ error: 'Error decoding token.' })
  }
}

module.exports = { tokenExtractor, userExtractor }
