import { body } from 'express-validator/check'

export const buyerValidationChain = [
  body('name').isString().withMessage('Invalid input for name'),
  body('company').isString().withMessage('Invalid input for company'),
]
