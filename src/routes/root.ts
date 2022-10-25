import { Router } from 'express'

const indexRoutes = Router()

indexRoutes.get('/status', (req, res) => {
  res.json({
    status: 'ok'
  })
})

export default indexRoutes
