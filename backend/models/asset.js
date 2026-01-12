const sequelize = require('../utils/db')
const { Model, DataTypes } = require('sequelize')

// TODO: add validation (pick genre from preexisting list, obviously the backend should make a valid URI, etc)
// TODO: if I add asset creation: add a link to the user that created this (in index)

class Asset extends Model {}
Asset.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  contentUri: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  length: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  numComments: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'asset'
})

module.exports = Asset