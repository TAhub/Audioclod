const { Op } = require('sequelize')
const { User } = require('../models')

const setupStartingState = async () => {
  // Clear the old values.
  const where = { id: { [Op.gte]: 0 } } // A condition that everything will pass, since this version of sequelize has no "destroyAll"
  await User.destroy({ where })
  // Make a starting user.
  await User.create({ username: 'foo', passwordHash: 'bar' })
}

module.exports = {
  setupStartingState,
}
