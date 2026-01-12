const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const { Asset } = require('../models')
const testHelper = require('./test_helper')

const api = supertest(app)
let startingAssets
let startingUsers

describe('assets controller', () => {
  beforeEach(async () => {
    const startingState = await testHelper.setupStartingState()
    startingUsers = startingState.users
    startingAssets = startingState.assets
  })

  describe('GET all', () => {
    test('returns correct number of assets', async () => {
      const assets = (await api
        .get('/api/assets')
        .expect(200)
        .expect('Content-Type', /application\/json/)).body
       assert.strictEqual(assets.length, 3)
    })
  })

  describe('GET query', () => {
    test('returns correct number of assets', async () => {
      const newAssets = (await api
        .get('/api/assets?name=new')
        .expect(200)
        .expect('Content-Type', /application\/json/)).body
       assert.strictEqual(newAssets.length, 1)
      const oldAssets = (await api
        .get('/api/assets?name=old')
        .expect(200)
        .expect('Content-Type', /application\/json/)).body
       assert.strictEqual(oldAssets.length, 2)
      const noAssets = (await api
        .get('/api/assets?name=blorpity')
        .expect(200)
        .expect('Content-Type', /application\/json/)).body
       assert.strictEqual(noAssets.length, 0)
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

  describe('POST comment', () => {
    test('creates a comment', async () => {
      const newComment = {
        content: 'Hello World',
        timestamp: 15,
      }
      const oldComments = (await api.get(`/api/assets/${startingAssets.fewComments.id}/comments`)).body
      await api
        .post(`/api/assets/${startingAssets.fewComments.id}/comments`)
        .set('Authorization', testHelper.getAuthHeaderForUser(startingUsers.admin))
        .send(newComment)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const newComments = (await api.get(`/api/assets/${startingAssets.fewComments.id}/comments`)).body
      assert.strictEqual(newComments.length, oldComments.length + 1, 'number of comments did not increase')
      assert.ok(newComments.some((comment) => comment.content == newComment.content), 'new comment was saved incorrectly')
    })

    test('does not work if no credentials are applied', async () => {
      const newComment = {
        content: 'Hello World',
        timestamp: 15,
      }
      await api
        .post(`/api/assets/${startingAssets.fewComments.id}/comments`)
        .send(newComment)
        .expect(401)
    })

    test('does not work if the timestamp is before 0s', async () => {
      const newComment = {
        content: 'Hello World',
        timestamp: -10,
      }
      await api
        .post(`/api/assets/${startingAssets.fewComments.id}/comments`)
        .set('Authorization', testHelper.getAuthHeaderForUser(startingUsers.admin))
        .send(newComment)
        .expect(400)
    })

    test('does not work if the timestamp is after the end of the asset', async () => {
      const newComment = {
        content: 'Hello World',
        timestamp: 999,
      }
      await api
        .post(`/api/assets/${startingAssets.fewComments.id}/comments`)
        .set('Authorization', testHelper.getAuthHeaderForUser(startingUsers.admin))
        .send(newComment)
        .expect(400)
    })

    test('does not work if the asset does not exist', async () => {
      const newComment = {
        content: 'Hello World',
        timestamp: 15,
      }
      await api
        .post(`/api/assets/${startingAssets.fewComments.id + 100}/comments`)
        .set('Authorization', testHelper.getAuthHeaderForUser(startingUsers.admin))
        .send(newComment)
        .expect(404)
    })
  })
})
