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

  describe('GET all', () => {
    test('returns as json', async () => {
      await api
        .get('/api/assets')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  })

  describe('GET one', () => {
    test('returns as json', async () => {
      await api
        .get(`/api/assets/${startingAssets.fewComments.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  })

  describe('GET comments', () => {
    test('gets comments', async () => {
      const comments = (await api.get(`/api/assets/${startingAssets.fewComments.id}/comments`)).body
      assert.strictEqual(comments.length, 2)
      assert.strictEqual(comments[0].timestamp, 2)
      assert.strictEqual(comments[0].content, 'Comment at 2s')
    })
  })
})
