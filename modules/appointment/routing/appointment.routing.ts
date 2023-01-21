import express from 'express'
import { validate } from '../../middlereware/validationService'
import { AppointmentController } from '../controllers/appointment.controller'
import { appointmentValidationChain } from '../service/validationService'

const router = express.Router()

// Create a new appointment
router.post(
  '/',
  validate(appointmentValidationChain),
  AppointmentController.create
)

// Update an appointment
router.post(
  '/:appointmentId',
  validate(appointmentValidationChain),
  AppointmentController.update
)

// Delete an appointment
router.delete('/:appointmentId', AppointmentController.delete)

// Find all appointments for a specific day
router.get('/day/:day', AppointmentController.findAppointmentsByDay)

// Get all appointments (with limit)
router.get('/', AppointmentController.fetchAll)

export const AppointmentRouter = router
