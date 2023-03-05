import request from 'supertest'
import app from '../../../src/app'
import mongoose from 'mongoose';


describe('/api/v1/menu endpoint', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test');
  })

  afterAll(async () => {
    await mongoose.connection.dropCollection('menus');
    await mongoose.connection.close();
  })

  test('should return 404 when menu list not found', async() => {
    const menuListResponse = await request(app).get('/api/v1/menu')

    expect(menuListResponse).toHaveProperty('status', 404)
    expect(menuListResponse).toHaveProperty('body')
    expect(menuListResponse.body).toHaveProperty('message')
  });

  test('should return 201 when menu created was successful', async() => {
    // jest.useFakeTimers();
    const parentResponse = await request(app).post('/api/v1/menu').send({
      name: 'Eletro'
    })

    const parentId = parentResponse.body.id;

    const firstSubmenuResponse = await request(app).post('/api/v1/menu').send({
      name: 'Eletro',
      relatedId: parentId
    })

    const firstSubmenuId = firstSubmenuResponse.body.id

    const secondSubmenuResponse = await request(app).post('/api/v1/menu').send({
      name: 'Eletro',
      relatedId: firstSubmenuId
    })

    const secondSubmenuId = secondSubmenuResponse.body.id

    expect(parentResponse).toHaveProperty('status', 201)
    expect(parentResponse).toHaveProperty('body')
    expect(parentResponse.body).toHaveProperty('id', parentId)

    console.log(firstSubmenuResponse.body)
    expect(firstSubmenuResponse).toHaveProperty('status', 201)
    expect(firstSubmenuResponse).toHaveProperty('body')
    expect(firstSubmenuResponse.body).toHaveProperty('id', firstSubmenuId)


    expect(secondSubmenuResponse).toHaveProperty('status', 201)
    expect(secondSubmenuResponse).toHaveProperty('body')
    expect(secondSubmenuResponse.body).toHaveProperty('id', secondSubmenuId)
  })

  test('should return 200 when menu list was successful', async() => {
    const menuListResponse = await request(app).get('/api/v1/menu')


    console.log(JSON.stringify(menuListResponse.body, null, 2))
    expect(menuListResponse).toHaveProperty('status', 200)
    expect(menuListResponse).toHaveProperty('body')
  })

  test('should return 200 when menu item was removed successful', async() => {
    const menuListResponse = await request(app).get('/api/v1/menu')
    const idToDelete = menuListResponse.body[0].submenus[0]._id;
    const deleteResponse = await request(app).delete(`/api/v1/menu/${idToDelete}`)

    expect(deleteResponse).toHaveProperty('status', 200)
  })

  test('should return 400 when menu item id was not a valid mongo ObjectId', async() => {
    const deleteResponse = await request(app).delete('/api/v1/menu/abc123')
    expect(deleteResponse).toHaveProperty('status', 400)
  })

  test('should return 404 when menu item was not found', async() => {
    const deleteResponse = await request(app).delete('/api/v1/menu/640120d11ea40cc9c1eb9864')
    expect(deleteResponse).toHaveProperty('status', 404)
  })
})
