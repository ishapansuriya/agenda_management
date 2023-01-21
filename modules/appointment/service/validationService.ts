import { body } from 'express-validator/check'

export const appointmentValidationChain = [
  body('title').isString().withMessage('Invalid input for title'),
  body('type')
    .isIn(['virtual', 'physical'])
    .withMessage('Invalid input for type'),
  body('host').isNumeric().withMessage('Invalid input for host'),
  body('client').isNumeric().withMessage('Invalid input for client'),
  body('location')
    .if(body('type').equals('physical'))
    .notEmpty()
    .withMessage('Invalid input for location'),
  body('link')
    .if(body('type').equals('virtual'))
    .isURL()
    .withMessage('Invalid input for link'),
  body('startTime').isISO8601().withMessage('Invalid input for startTime'),
  body('endTime').isISO8601().withMessage('Invalid input for endTime'),
  body('endTime').custom((endTime, { req }) => {
    if (new Date(endTime) > new Date(req.body.startTime)) {
      return true
    }
    throw new Error('End time must be greater than start time')
  }),
]
