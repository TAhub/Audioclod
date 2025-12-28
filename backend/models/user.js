const sequelize = require('../utils/db')
const { Model, DataTypes } = require('sequelize')

// TODO: add validation (min and max length for username, etc)
// TODO: hide password hash from frontend
// TODO: if I add asset creation: add bool flag "uploadInProcess"

class User extends Model {}
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false
  },
  passwordHash: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user'
})

module.exports = User