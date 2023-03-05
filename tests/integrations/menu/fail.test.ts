import request from 'supertest'
import app from '../../../src/app'
import mongoose from 'mongoose'

describe('/api/v1/menu endpoint', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test')
    await mongoose.connection.close()
  })

  test('[POST] should return 500 when menu created return error', async () => {
    const parentResponse = await request(app).post('/api/v1/menu').send({
      name: 'Eletro',
    })

    expect(parentResponse).toHaveProperty('status', 500)
  })

  test('[GET] should return 500 when menu list return error', async () => {
    const listResponse = await request(app).get('/api/v1/menu')
    expect(listResponse).toHaveProperty('status', 500)
  })

  test('[DELETE] should return 500 when remove menu item return error', async () => {
    const deleteResponse = await request(app).delete(
      '/api/v1/menu/640120d11ea40cc9c1eb9864',
    )
    expect(deleteResponse).toHaveProperty('status', 500)
  })
})
