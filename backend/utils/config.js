require('dotenv').config()

const PORT = process.env.PORT
const PASSWORD_HASH_SALT_ROUNDS = 10
const TOKEN_SECRET = process.env.TOKEN_SECRET
const IS_TEST = process.env.NODE_ENV === 'test'
const POSTGRES_URL = IS_TEST
  ? process.env.TEST_POSTGRES_URL
  : process.env.PROD_POSTGRES_URL

module.exports = { IS_TEST, PORT, PASSWORD_HASH_SALT_ROUNDS, TOKEN_SECRET, POSTGRES_URL }
