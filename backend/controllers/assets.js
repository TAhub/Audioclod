const assetsRouter = require('express').Router()
const { Asset, Comment } = require('../models')
const middleware = require('../utils/middleware')

assetsRouter.get('/', async (request, response) => {
  const assets = await Asset.findAll()
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
    const comment = await Comment.create({ content, timestamp, assetId: id , userId: request.user.id })
    return response.status(201).json(comment).end()
  } catch (error) {
    // TODO: interpret any specific errors
    return response.status(400).json(error).end()
  }
})

module.exports = assetsRouter
