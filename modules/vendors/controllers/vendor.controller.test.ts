import request from 'supertest'
import app from '../../../index'

describe('Vendor API', () => {
  test('creating an vendor', async () => {
    const response = await request(app).post('/vendor').send({
      name: 'Test Vendor',
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body.name).toEqual('Test Vendor')
  })
})
