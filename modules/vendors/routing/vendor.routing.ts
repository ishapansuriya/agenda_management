import express from 'express'
import { validate } from '../../middlereware/validationService'
import { VendorController } from '../controllers/vendor.controller'
import { vendorValidationChain } from '../service/validation'

const router = express.Router()

// Create a new vendor
router.post('/', validate(vendorValidationChain), VendorController.create)

// Get all vendors (with limit)
router.get('/', VendorController.fetchAll)

export const VendorRouter = router
