export class BuyerEntity {
  id: number
  name: string
  company: string

  constructor(buyerEntity: BuyerEntity) {
    this.id = buyerEntity.id
    this.name = buyerEntity.name
    this.company = buyerEntity.company
  }
}
