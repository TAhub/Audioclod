const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { User, Asset, Comment } = require('../models')
const bcrypt = require('bcrypt')
const config = require('../utils/config')

const makeUser = async (username, password) => {
  const passwordHash = await bcrypt.hash(password, config.PASSWORD_HASH_SALT_ROUNDS)
  return await User.create({ username, passwordHash })
}

const makeAsset = async (name, length, commentTimestamps, user) => {
  const asset = await Asset.create({ contentUri: 'www.fake.com', name, length })
  for (const timestamp of commentTimestamps) {
    const content = `Comment at ${timestamp}s`
    await Comment.create({ content, timestamp, assetId: asset.id, userId: user.id })
  }
  return asset
}

const setupStartingState = async () => {
  // Clear the old values.
  const where = { id: { [Op.gte]: 0 } } // A condition that everything will pass, since this version of sequelize has no "destroyAll"
  await User.destroy({ where })
  await Asset.destroy({ where })
  await Comment.destroy({ where })
  // Make the starting users.
  const normal = await makeUser('foo', 'bar')
  const admin = await makeUser('lorem', 'ipsum')
  const deactive = await makeUser('baz', 'qux')
  // Update the users to have the correct traits.
  admin.admin = true
  await admin.save()
  deactive.active = false
  await deactive.save()
  // Make the starting assets.
  const fewComments = await makeAsset('old boring music', 30, [2, 10], normal)
  const manyComments = await makeAsset('new fun music', 20, [2, 5, 10, 18], normal)
  const noComments = await makeAsset('very old boring music', 60, [], normal)
  // Return the created values, to simplify some of the tests.
  return {
    users: { normal, admin, deactive },
    assets: { fewComments, manyComments, noComments },
  }
}

const getAuthHeaderForUser = (user) => {
  const token = jwt.sign({ id: user.id, username: user.username }, config.TOKEN_SECRET)
  return `Bearer ${token}`
}

module.exports = {
  setupStartingState,
  getAuthHeaderForUser,
}
