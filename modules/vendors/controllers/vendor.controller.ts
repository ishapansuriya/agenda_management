import { Request, Response } from 'express'
import { validationResult } from 'express-validator/check'
import { VendorRepository } from '../infra/vendor.repository'

export class VendorController {
  static async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      const name = req.body.name
      const vendor = await VendorRepository.create(name)
      return res.send(vendor)
    } catch (error) {
      return res.status(500).send(error)
    }
  }

  static async fetchAll(req: Request, res: Response) {
    try {
      const limit = Number(req.query?.limit ?? 10)
      const vendors = await VendorRepository.fetchAll(limit)
      res.send(vendors)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}
