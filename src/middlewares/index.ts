import { Application, json } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

export default function setupMiddlewares (app: Application) {
  app.use(json())
  app.use(morgan('dev'))
  app.use(cors())
  app.use(
    rateLimit({
      windowMs: 5 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    })
  )
  app.use(helmet())
}
