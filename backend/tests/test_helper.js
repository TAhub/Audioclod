const { Op } = require('sequelize')
const { User } = require('../models')
const bcrypt = require('bcrypt')
const config = require('../utils/config')

const setupStartingState = async () => {
  // Clear the old values.
  const where = { id: { [Op.gte]: 0 } } // A condition that everything will pass, since this version of sequelize has no "destroyAll"
  await User.destroy({ where })
  // Make a starting user.
  const passwordHash = await bcrypt.hash('bar', config.PASSWORD_HASH_SALT_ROUNDS)
  await User.create({ username: 'foo', passwordHash })
}

module.exports = {
  setupStartingState,
}
