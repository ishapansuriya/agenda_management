import { Request, Response } from 'express'
import { BuyerRepository } from '../../buyers/infra/buyer.repository'
import { VendorRepository } from '../../vendors/infra/vendor.repository'
import { AppointmentRepository } from '../infra/appointment.repository'

export class AppointmentController {
  static async create(req: Request, res: Response) {
    try {
      const { title, type, location, link, host, client, startTime, endTime } =
        req.body
      const vendor = await VendorRepository.fetchById(host)
      if (vendor) {
        res.status(400).send({
          message: 'Vendor not found.',
        })
        return
      }
      const buyer = await BuyerRepository.fetchById(client)
      if (buyer) {
        res.status(400).send({
          message: 'Buyer not found.',
        })
        return
      }

      const conflictingAppointment =
        await AppointmentRepository.checkConflictsOnCreate(
          host,
          client,
          new Date(startTime),
          new Date(endTime)
        )
      if (conflictingAppointment.length > 0) {
        res.status(400).send({
          message: 'Conflicting appointment found for host or client.',
        })
        return
      }

      const appointment = await AppointmentRepository.create(
        title,
        type,
        location,
        link,
        host,
        client,
        new Date(startTime),
        new Date(endTime)
      )
      return res.send(appointment)
    } catch (error) {
      return res.status(500).send(error)
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { title, type, location, link, host, client, startTime, endTime } =
        req.body
      const id = Number(req.params.appointmentId)
      const conflictingAppointment =
        await AppointmentRepository.checkConflictsOnUpdate(
          id,
          host,
          client,
          new Date(startTime),
          new Date(endTime)
        )

      if (conflictingAppointment.length > 0) {
        res.status(400).send({
          message: 'Conflicting appointment found for host or client.',
        })
        return
      }
      await AppointmentRepository.update(
        id,
        title,
        type,
        location,
        link,
        host,
        client,
        new Date(startTime),
        new Date(endTime)
      )
      res.send('Appointment updated successfully')
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.appointmentId)
      await AppointmentRepository.delete(id)

      res.send('Appointment deleted successfully')
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async findAppointmentsByDay(req: Request, res: Response) {
    try {
      const day = new Date(req.params.day)
      const appointments = await AppointmentRepository.findAppointmentsByDay(
        day
      )
      res.send(appointments)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async fetchAll(req: Request, res: Response) {
    try {
      const limit = Number(req.query?.limit ?? 10)
      const appointments = await AppointmentRepository.fetchAll(limit)
      res.send(appointments)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}
