const { Op } = require('sequelize')
const { User, Asset, Comment } = require('./models')
const bcrypt = require('bcrypt')
const config = require('./utils/config')

const makeUser = async (username, password) => {
  const passwordHash = await bcrypt.hash(password, config.PASSWORD_HASH_SALT_ROUNDS)
  return await User.create({ username, passwordHash })
}

const makeAsset = async (name, contentUri, length, user) => {
  return await Asset.create({ contentUri, name, length, numComments: 0, userId: user.id })
}

const comment = async (asset, content, timestamp, user) => {
  const comment = await Comment.create({ content, timestamp, assetId: asset.id, userId: user.id })
  asset.numComments += 1
  await asset.save()
}

const setupStartingState = async () => {
  console.log('### Started initial state setup!')

  // Clear the old values.
  const where = { id: { [Op.gte]: 0 } } // A condition that everything will pass, since this version of sequelize has no "destroyAll"
  await User.destroy({ where })
  await Asset.destroy({ where })
  await Comment.destroy({ where })
  // Make the starting users.
  const admin = await makeUser('Admin', 'swordfish')
  const stefan = await makeUser('StefanKartenberg', 'loveukes')
  const musicfan = await makeUser('MusicFan400', 'mileycyrussucks')
  // Update the users to have the correct traits.
  admin.admin = true
  await admin.save()
  // Make the starting assets.
  const asset1 = await makeAsset('Dig the Uke (Clear)', 'https://storage.googleapis.com/shaka-demo-assets/dig-the-uke-clear/dash.mpd', 177, stefan)
  await comment(asset1, 'I performed this song! (This account isn\'t mine BTW)', 2, stefan)
  await comment(asset1, 'This part is cool.', 50, musicfan)
  await comment(asset1, 'As an admin, I approve of this music.', 15, admin)
  const asset2 = await makeAsset('Dig the Uke (Widevine)', 'https://storage.googleapis.com/shaka-demo-assets/dig-the-uke/dash.mpd', 177, stefan)
  await comment(asset2, 'This asset has been encrypted with Widevine encryption!', 2, admin)
  await comment(asset2, 'That\'s not a special feature of this page or anything, though. It\'s just a Shaka Player feature.', 5, admin)
  const asset3 = await makeAsset('Bleep Bloop (HLS)', 'https://storage.googleapis.com/shaka-demo-assets/raw-hls-audio-only/manifest.m3u8', 1800, admin)
  await comment(asset3, 'This is an Apple test pattern. How fun?', 2, admin)
  await comment(asset3, 'Wow, I loved this song! I listened all of the way until the end!', 1782, musicfan)
  await comment(asset3, 'I gotta find more to listen to...', 1793, musicfan)
  const asset4 = await makeAsset('BBC Test Stream (Surround)', 'https://rdmedia.bbc.co.uk/testcard/vod/manifests/radio-surround-en.mpd', 3600, musicfan)
  await comment(asset4, 'The BBC sure makes some cool music! Listen to this sick tune!', 25, musicfan)
  const asset5 = await makeAsset('BBC Test Stream (Stereo)', 'https://rdmedia.bbc.co.uk/testcard/vod/manifests/radio-flac-en.mpd', 3600, musicfan)
  await comment(asset5, 'Do you have permission to be posting these things, MusicFan400?', 2, admin)
  await comment(asset5, 'Uh, totally!', 5, musicfan)
  await comment(asset5, 'Right...', 8, admin)

  console.log('### Finished initial state setup!')
}

module.exports = {
  setupStartingState,
}