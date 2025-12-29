const assetsRouter = require('express').Router()
const { Asset } = require('../models')

assetsRouter.get('/', async (request, response) => {
  const assets = await Asset.findAll()
  response.json(assets)
})

module.exports = assetsRouter
