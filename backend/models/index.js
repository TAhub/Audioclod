const User = require('./user')
const Asset = require('./asset')
const Comment = require('./comment')

const setup = async () => {
  console.log('### Started syncing models!')

  // Sync the models up.
  await User.sync()
  await Asset.sync()
  await Comment.sync()

  console.log('### Adding foreign keys!')

  // Add links to the models.
  Comment.belongsTo(User)
  Comment.belongsTo(Asset)
  Asset.belongsTo(User)
  // TODO: do I need links back? like is there a performance advantage on queries, if you do it that way?

  // Sync the models a second time, to establish these belongsTo relationships.
  await User.sync()
  await Asset.sync()
  await Comment.sync()

  console.log('### Finished syncing models!')
}
const setupPromise = setup()

module.exports = { User, Asset, Comment, setupPromise }
