import { body } from 'express-validator/check'

export const vendorValidationChain = [
  body('name').isString().withMessage('Invalid input for name'),
]
