const sequelize = require('../utils/db')
const { Model, DataTypes } = require('sequelize')

// TODO: add validation (min and max content length, should be a valid asset, should be a valid timestamp, etc)

class Comment extends Model {}
Comment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  timestamp: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'comment'
})

module.exports = Comment