const assetsRouter = require('express').Router()
const { Op } = require('sequelize')
const { Asset, Comment, User } = require('../models')
const middleware = require('../utils/middleware')

assetsRouter.get('/', async (request, response) => {
  const where = {}
  const order = []
  const limit = request.query.pageSize || 1
  let offset = 0
  if (request.query.name) {
    const nameSearch = '%' + request.query.name + '%'
    where['name'] = { [Op.iLike]: nameSearch }
  }
  if (request.query.page) {
    offset = request.query.page * limit
  }
  if (request.query.popular) {
    if (request.query.name) {
      return response.status(400).send({ error: 'Popular tab cannot be filtered.' })
    }
    // TODO: In a real app, this would probably be a curated list based on an algorithm...
    // Perhaps an exponential moving algorithm, or something complex and secret.
    // For a one-man solo project, we are looking at the most commented assets, right now.
    order.push(['numComments', 'DESC'])
  }
  const assets = await Asset.findAndCountAll({ where, order, limit, offset })
  response.json(assets)
})

assetsRouter.get('/:id', async (request, response) => {
  const id = parseInt(request.params.id)
  const asset = await Asset.findByPk(id)
  response.json(asset)
})

assetsRouter.get('/:id/comments', async (request, response) => {
  const id = parseInt(request.params.id)
  const comments = await Comment.findAll({
    where: {
      asset_id: id
    },
    include: {
      model: User,
      as: 'user',
    },
  })
  response.json(comments)
})

assetsRouter.post('/:id/comments', middleware.userExtractor, async (request, response) => {
  const id = parseInt(request.params.id)
  const { content, timestamp } = request.body
  if (timestamp < 0) {
    return response.status(400).send({ error: 'Timestamp cannot be negative.' })
  }
  const asset = await Asset.findByPk(id)
  if (asset == null) {
    return response.status(404).send({ error: 'Timestamps cannot be added to non-assets.' })
  }
  if (timestamp > asset.length) {
    return response.status(400).send({ error: 'Timestamp cannot be after the end of an asset.' })
  }
  try {
    // First, increment the comment count on the asset.
    await asset.increment('numComments', { by: 1 })
    // Then, post the comment.
    const comment = await Comment.create({ content, timestamp, assetId: id , userId: request.user.id })
    // To reduce the number of queries the frontend needs to make,
    // this joins the user onto the result before posting.
    // It does not appear that doing a "manual join" of the data here is possible, so instead
    // we manipulate the JSON before returning it.
    const commentJson = comment.toJSON()
    commentJson.user = request.user.toJSON()
    return response.status(201).json(commentJson).end()
  } catch (error) {
    // TODO: depending on when this errors, it might have to manually recalculate 'numComments'
    // TODO: interpret any specific errors
    return response.status(400).json(error).end()
  }
})

module.exports = assetsRouter
