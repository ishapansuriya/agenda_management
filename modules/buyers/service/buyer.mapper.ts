import { BuyerEntity } from '../domain/buyer.entity'
import { BuyerRow } from '../domain/buyerRow'

export default class BuyerMap {
  static toDomain(row: BuyerRow): BuyerEntity {
    return {
      id: row.id,
      name: row.name,
      company: row.company,
    }
  }
}
