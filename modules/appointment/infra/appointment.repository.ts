import * as DBConnection from '../../postgres/infra/db.connection'
import { AppointmentEntity } from '../domain/appointment.entity'
import AppointmentMap from '../service/appointment.mapper'

export class AppointmentRepository {
  static async create(
    title: string,
    type: string,
    location: string,
    link: string,
    host: number,
    client: number,
    startTime: Date,
    endTime: Date
  ): Promise<AppointmentEntity> {
    const result = await DBConnection.query(createQuery, [
      title,
      type,
      location,
      link,
      host,
      client,
      startTime,
      endTime,
    ])

    return AppointmentMap.toDomain(result[0])
  }

  static async update(
    id: number,
    title: string,
    type: string,
    location: string,
    link: string,
    host: number,
    client: number,
    startTime: Date,
    endTime: Date
  ): Promise<void> {
    await DBConnection.query(updateQuery, [
      id,
      title,
      type,
      location,
      link,
      host,
      client,
      startTime,
      endTime,
    ])
  }

  static async fetchAll(limit: number): Promise<AppointmentEntity[]> {
    const rows = await DBConnection.query(fetchAllQuery, [limit])

    return rows.map(AppointmentMap.toDomain)
  }

  static async delete(id: number): Promise<void> {
    await DBConnection.query(deleteByIdQuery, [id])
  }

  static async findAppointmentsByDay(day: Date): Promise<AppointmentEntity[]> {
    const rows = await DBConnection.query(findAppointmentsByDayQuery, [
      day,
      day,
    ])

    return rows.map(AppointmentMap.toDomain)
  }

  static async checkConflictsOnCreate(
    host: number,
    client: number,
    startTime: Date,
    endTime: Date
  ): Promise<AppointmentEntity[]> {
    const rows = await DBConnection.query(checkConflictsOnCreateQuery, [
      host,
      endTime,
      startTime,
      client,
      endTime,
      startTime,
    ])

    return rows.map(AppointmentMap.toDomain)
  }
  static async checkConflictsOnUpdate(
    id: number,
    host: number,
    client: number,
    startTime: Date,
    endTime: Date
  ): Promise<AppointmentEntity[]> {
    const rows = await DBConnection.query(checkConflictsOnUpdateQuery, [
      host,
      endTime,
      startTime,
      client,
      endTime,
      startTime,
      id,
    ])

    return rows.map(AppointmentMap.toDomain)
  }
}

const createQuery = `INSERT INTO
                      appointments ( title,
                        type,
                        location,
                        link,
                        host,
                        client,
                        start_date,
                        end_date)
                      VALUES
                        ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`

const updateQuery = `UPDATE
appointments
  SET
  title = $2,
  type = $3,
  location = $4,
  link = $5,
  host = $6,
  client = $7,
  start_date = $8,
  end_date = $9,
  updated_at = current_timestamp
  WHERE
  id = $1;`

const fetchAllQuery = `SELECT
                          *
                        FROM
                        appointments
                        LIMIT
                          $1;`

const findAppointmentsByDayQuery = `SELECT * FROM appointments
WHERE start_date::date = $1::date OR end_date::date = $2::date;
`

const deleteByIdQuery = `DELETE
                        FROM
                        appointments
                        WHERE id = $1;`

const checkConflictsOnCreateQuery = `SELECT * FROM appointments WHERE host = $1 AND start_date <= $2 AND end_date >= $3
OR client = $4 AND start_date <= $5 AND end_date >= $6`

const checkConflictsOnUpdateQuery = `SELECT * FROM appointments WHERE id != $7 and (host = $1 AND start_date <= $2 AND end_date >= $3
OR client = $4 AND start_date <= $5 AND end_date >= $6)`
