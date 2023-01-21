import express from 'express'
import { validate } from '../../middlereware/validationService'
import { BuyerController } from '../controllers/buyer.controller'
import { buyerValidationChain } from '../service/validationService'

const router = express.Router()

// Create a new buyer
router.post('/', validate(buyerValidationChain), BuyerController.create)

// Get all buyers (with limit)
router.get('/', BuyerController.fetchAll)

export const BuyerRouter = router
