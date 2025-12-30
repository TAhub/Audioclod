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

assetsRouter.post('/:id/comment', middleware.userExtractor, async (request, response) => {
  //const id = parseInt(request.params.id)
  //const { content, timestamp } = 
})

module.exports = assetsRouter
