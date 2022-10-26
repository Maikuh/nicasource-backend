import 'reflect-metadata'
import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import { AppDataSource } from './config/data-source'
import config from './config'
import { logger } from './logger'
import routes from './routes'
import { HttpException } from './common/exceptions'
import setupMiddlewares from './middlewares'

async function bootstrap () {
  await AppDataSource.initialize()

  if (AppDataSource.isInitialized) {
    logger.info('Successfully connected to the database')
  }

  const app = express()

  setupMiddlewares(app)

  for (const [path, router] of Object.entries(routes)) {
    app.use(path, router)
  }

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpException) {
      res.status(err.getStatus()).json(err.getResponse())
      return next()
    }

    next(err)
  })

  app.listen(config.app.port, () => {
    logger.info(`Server has successfully started on port ${config.app.port}`)
  })
}

bootstrap().catch(logger.error)
