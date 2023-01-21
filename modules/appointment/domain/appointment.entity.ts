export class AppointmentEntity {
  id?: number
  title: string
  type: string
  location?: string
  link?: string
  host: number
  client: number
  startTime: Date
  endTime: Date

  constructor(appointmentEntity: AppointmentEntity) {
    this.id = appointmentEntity.id
    this.title = appointmentEntity.title
    this.type = appointmentEntity.type
    this.location = appointmentEntity.location
    this.link = appointmentEntity.link
    this.host = appointmentEntity.host
    this.client = appointmentEntity.client
    this.startTime = appointmentEntity.startTime
    this.endTime = appointmentEntity.endTime
  }
}
