const User = require('./user')
const Asset = require('./asset')
const Comment = require('./comment')

const setup = async () => {
  // Add links to the models.
  Comment.belongsTo(User)
  Comment.belongsTo(Asset)
  // TODO: do I need links back? like is there a performance advantage on queries, if you do it that way?

  // Sync the models up.
  // These are sync'd in a particular order, such that the relations exist when set up.
  await User.sync()
  await Asset.sync()
  await Comment.sync()
}
setup()

module.exports = { User, Asset, Comment }
