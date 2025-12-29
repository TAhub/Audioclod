const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { User, Asset } = require('../models')
const bcrypt = require('bcrypt')
const config = require('../utils/config')

const makeUser = async (username, password) => {
  const normalPasswordHash = await bcrypt.hash(password, config.PASSWORD_HASH_SALT_ROUNDS)
  return await User.create({ username, passwordHash: normalPasswordHash })
}

const makeAsset = async (name, length) => {
  return await Asset.create({ contentUri: 'www.fake.com', name, length })
}

const setupStartingState = async () => {
  // Clear the old values.
  const where = { id: { [Op.gte]: 0 } } // A condition that everything will pass, since this version of sequelize has no "destroyAll"
  await User.destroy({ where })
  await Asset.destroy({ where })
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
  const fewComments = await makeAsset('old boring music', 30)
  // Return the created values, to simplify some of the tests.
  return {
    users: { normal, admin, deactive },
    assets: { fewComments },
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
