const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const { User } = require('../models')
const testHelper = require('./test_helper')

const api = supertest(app)

describe('login controller', () => {
  beforeEach(async () => {
    await testHelper.setupStartingState()
  })

  describe('POST', () => {
    test('makes a token when inputs are correct', async () => {
      const result = await api
        .post('/api/login')
        .send({ username: 'foo', password: 'bar' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
      assert.ok(result.body.token)
    })

    describe('errors if', () => {
      test('no username', async () => {
        await api
          .post('/api/login')
          .send({ password: 'bar' })
          .expect(401)
      })

      test('no password', async () => {
        await api
          .post('/api/login')
          .send({ username: 'foo' })
          .expect(401)
      })

      test('username does not exist', async () => {
        await api
          .post('/api/login')
          .send({ username: 'baz', password: 'baz' })
          .expect(401)
      })

      test('no password does not match user password', async () => {
        await api
          .post('/api/login')
          .send({ username: 'foo', password: 'baz' })
          .expect(401)
      })
    })
  })
})