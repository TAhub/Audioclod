const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const { Asset } = require('../models')
const testHelper = require('./test_helper')

const api = supertest(app)
let startingAssets

describe('assets controller', () => {
  beforeEach(async () => {
    startingAssets = (await testHelper.setupStartingState()).assets
  })

  describe('GET', () => {
    test('returns as json', async () => {
      await api
        .get('/api/assets')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  })
})
