const { Sequelize } = require('sequelize')
const config = require('../utils/config')
const sequelize = new Sequelize(config.POSTGRES_URL)
if (config.IS_TEST) {
  sequelize.options.logging = console.log
}
module.exports = sequelize