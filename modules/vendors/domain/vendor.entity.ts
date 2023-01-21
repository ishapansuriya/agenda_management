export class VendorEntity {
  id: number
  name: string

  constructor(vendorEntity: VendorEntity) {
    this.id = vendorEntity.id
    this.name = vendorEntity.name
  }
}
