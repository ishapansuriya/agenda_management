import 'jest'
import { VendorRepository } from './vendor.repository'

describe('Vendor', () => {
  it('should create Vendor', async () => {
    const orderFromDb = await VendorRepository.create('John')
    expect(orderFromDb).toMatchObject({
      name: 'John',
    })
  })
})
