import request from 'supertest'
import app from '../../../src/app'
import mongoose from 'mongoose'

describe('/api/v1/health endpoint', () => {
  test('[GET] should return 200 when healthz is UP', async () => {
    await mongoose.connect('mongodb://localhost:27017/test')

    const res = await request(app).get('/api/v1/health')
    expect(res.statusCode).toEqual(200)

    expect(res.body).toBeTruthy()
    expect(res.body).toHaveProperty('db')
    expect(res.body.db).toHaveProperty('status', 'up')
    expect(res.body.status).toBe('up')
    await mongoose.connection.close()
  })

  test('[GET] should return 500 when healthz is DOWN', async () => {
    const res = await request(app).get('/api/v1/health')
    expect(res.statusCode).toEqual(500)

    expect(res.body).toBeTruthy()
    expect(res.body).toHaveProperty('db')
    expect(res.body.db).toHaveProperty('status', 'down')
    expect(res.body.status).toBe('down')
  })
})
