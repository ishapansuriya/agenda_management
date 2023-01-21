import * as DBConnection from '../../postgres/infra/db.connection'
import { VendorEntity } from '../domain/vendor.entity'
import VendorMap from '../service/vendor.mapper'

export class VendorRepository {
  static async create(name: string): Promise<VendorEntity> {
    const result = await DBConnection.query(createQuery, [name])

    return VendorMap.toDomain(result[0])
  }
  static async fetchById(id: number): Promise<VendorEntity | undefined> {
    const rows = await DBConnection.query(fetchByIdQuery, [id])

    return rows[0] ? VendorMap.toDomain(rows[0]) : undefined
  }

  static async fetchAll(limit: number): Promise<VendorEntity[]> {
    const rows = await DBConnection.query(fetchAllQuery, [limit])

    return rows.map(VendorMap.toDomain)
  }
}

const createQuery = `INSERT INTO
                      vendors (name)
                      VALUES
                        ($1) RETURNING *;`

const fetchAllQuery = `SELECT
                          *
                        FROM
                        vendors
                        LIMIT
                          $1;`

const fetchByIdQuery = `SELECT
                          *
                        FROM
                          vendors
                        Where
                          id = $1;`
