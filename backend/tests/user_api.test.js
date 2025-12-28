const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const { User } = require('../models')
const testHelper = require('./test_helper')

const api = supertest(app)

describe('users controller', () => {
  beforeEach(async () => {
    await testHelper.setupStartingState()
  })

  describe('GET', () => {
    test('returns as json', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  })

  describe('POST', () => {
    test('adds to the database', async () => {
      const oldUsers = (await api.get('/api/users')).body
      const newUser = {
        username: 'aaaa',
        password: 'bbbb'
      }
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const newUsers = (await api.get('/api/users')).body
      assert.strictEqual(newUsers.length, oldUsers.length + 1, 'user count did not increase correctly')
      assert.strictEqual(newUsers[newUsers.length - 1].name, newUser.name, 'new user was saved incorrectly')
    })
  })
})