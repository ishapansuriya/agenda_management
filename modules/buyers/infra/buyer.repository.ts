import * as DBConnection from '../../postgres/infra/db.connection'
import { BuyerEntity } from '../domain/buyer.entity'
import BuyerMap from '../service/buyer.mapper'

export class BuyerRepository {
  static async create(name: string, company: string): Promise<BuyerEntity> {
    const result = await DBConnection.query(createQuery, [name, company])

    return BuyerMap.toDomain(result[0])
  }
  static async fetchById(id: number): Promise<BuyerEntity | undefined> {
    const rows = await DBConnection.query(fetchByIdQuery, [id])

    return rows[0] ? BuyerMap.toDomain(rows[0]) : undefined
  }
  static async fetchAll(limit: number): Promise<BuyerEntity[]> {
    const rows = await DBConnection.query(fetchAllQuery, [limit])

    return rows.map(BuyerMap.toDomain)
  }
}

const createQuery = `INSERT INTO
                      buyers (name, company)
                      VALUES
                        ($1, $2) RETURNING *;`

const fetchAllQuery = `SELECT
                          *
                        FROM
                          buyers
                        LIMIT
                          $1;`

const fetchByIdQuery = `SELECT
                          *
                        FROM
                          buyers
                        WHERE
                          id =$1;`
