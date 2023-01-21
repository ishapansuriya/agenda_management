import { json, urlencoded } from 'body-parser'
import donenv from 'dotenv'
import express from 'express'
import { AppointmentRouter } from './modules/appointment/routing/appointment.routing'
import { BuyerRouter } from './modules/buyers/routing/buyer.routing'
import { VendorRouter } from './modules/vendors/routing/vendor.routing'
donenv.config()

const app = express()
const port = process.env.PORT ?? 3000

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }))

// parse application/json
app.use(json())

// Here we can add authentication

// Set up the vendor controller
app.use('/vendor', VendorRouter)

// Set up the buyer controller
app.use('/buyer', BuyerRouter)

// Set up the appointment controller
app.use('/appointment', AppointmentRouter)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

export default app
