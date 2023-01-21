import { VendorEntity } from '../domain/vendor.entity'
import { VendorRow } from '../domain/vendorRow'

export default class VendorMap {
  static toDomain(row: VendorRow): VendorEntity {
    return {
      id: row.id,
      name: row.name,
    }
  }
}
