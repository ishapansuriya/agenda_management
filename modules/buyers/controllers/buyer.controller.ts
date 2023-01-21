import { Request, Response } from 'express'
import { validationResult } from 'express-validator/check'
import { BuyerRepository } from '../infra/buyer.repository'

export class BuyerController {
  static async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

      const { name, company } = req.body

      const buyer = await BuyerRepository.create(name, company)
      return res.send(buyer)
    } catch (error) {
      return res.status(500).send(error)
    }
  }

  static async fetchAll(req: Request, res: Response) {
    try {
      const limit = Number(req.query?.limit ?? 10)
      const buyers = await BuyerRepository.fetchAll(limit)
      res.send(buyers)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}
