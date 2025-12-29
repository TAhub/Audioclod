const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { User } = require('../models')
const bcrypt = require('bcrypt')
const config = require('../utils/config')

const makeUser = async (username, password) => {
  const normalPasswordHash = await bcrypt.hash(password, config.PASSWORD_HASH_SALT_ROUNDS)
  return await User.create({ username, passwordHash: normalPasswordHash })
}

const setupStartingState = async () => {
  // Clear the old values.
  const where = { id: { [Op.gte]: 0 } } // A condition that everything will pass, since this version of sequelize has no "destroyAll"
  await User.destroy({ where })
  // Make the starting users.
  const normal = await makeUser('foo', 'bar')
  const admin = await makeUser('lorem', 'ipsum')
  // Update the admin to be an admin.
  admin.admin = true
  await admin.save()
  return { normal, admin }
}

const getAuthHeaderForUser = (user) => {
  const token = jwt.sign({ id: user.id, username: user.username }, config.TOKEN_SECRET)
  return `Bearer ${token}`
}

module.exports = {
  setupStartingState,
  getAuthHeaderForUser,
}
