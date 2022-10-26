import { Application, json } from 'express'
import { pinoHttpLogger } from '../logger'
import cors from 'cors'
import helmet from 'helmet'

export default function setupMiddlewares (app: Application) {
  app.use(json())
  app.use(pinoHttpLogger)
  app.use(cors())
  app.use(helmet())
}
