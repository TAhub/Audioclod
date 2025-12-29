const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const { User } = require('../models')
const testHelper = require('./test_helper')

const api = supertest(app)
let startingUsers

describe('users controller', () => {
  beforeEach(async () => {
    startingUsers = await testHelper.setupStartingState()
  })

  describe('GET', () => {
    test('returns as json', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('does not expose passwordHash', async () => {
      const user = (await api.get('/api/users')).body[0]
      assert.ok(user.username)
      assert.equal(user.passwordHash, undefined)
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

  describe('DELETE', () => {
    test('succeeds if deleting self', async () => {
      const oldUsers = (await api.get('/api/users')).body
      const result = await api
        .delete(`/api/users/${startingUsers.normal.id}`)
        .set('Authorization', testHelper.getAuthHeaderForUser(startingUsers.normal))
        .expect(204)
      const newUsers = (await api.get('/api/users')).body
      assert.strictEqual(newUsers.length, oldUsers.length - 1, 'user count did not decrease correctly')
    })

    test('succeeds if admin is deleting', async () => {
      const oldUsers = (await api.get('/api/users')).body
      const result = await api
        .delete(`/api/users/${startingUsers.normal.id}`)
        .set('Authorization', testHelper.getAuthHeaderForUser(startingUsers.admin))
        .expect(204)
      const newUsers = (await api.get('/api/users')).body
      assert.strictEqual(newUsers.length, oldUsers.length - 1, 'user count did not decrease correctly')
    })

    test('fails if normal user is deleting other', async () => {
      await api
        .delete(`/api/users/${startingUsers.admin.id}`)
        .set('Authorization', testHelper.getAuthHeaderForUser(startingUsers.normal))
        .expect(403)
    })

    test('succeeds if admin tries to delete nonexistent user', async () => {
      await api
        .delete(`/api/users/${startingUsers.normal.id+10}`)
        .set('Authorization', testHelper.getAuthHeaderForUser(startingUsers.admin))
        .expect(400)
    })


    test('fails if unauthorized', async () => {
      await api
        .delete(`/api/users/${startingUsers.normal.id}`)
        .expect(401)
    })
  })
})
