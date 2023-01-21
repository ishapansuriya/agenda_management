import { AppointmentEntity } from '../domain/appointment.entity'
import { AppointmentRow } from '../domain/appointmentRow'

export default class AppointmentMap {
  static toDomain(row: AppointmentRow): AppointmentEntity {
    return {
      id: row.id,
      title: row.title,
      type: row.type,
      location: row.location,
      link: row.link,
      host: row.host,
      client: row.client,
      startTime: row.start_date,
      endTime: row.end_date,
    }
  }
}
