import { Application, json } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

export default function setupMiddlewares (app: Application) {
  app.use(json())
  app.use(morgan('dev'))
  app.use(cors())
  app.use(helmet())
}
