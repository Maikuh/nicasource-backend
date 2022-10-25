import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'
import { AppDataSource } from './config/data-source'
import config from './config'
import { logger, pinoHttpLogger } from './logger'
import routes from './routes'

async function bootstrap() {
  await AppDataSource.initialize()

  if (AppDataSource.isInitialized) {
    logger.info('Successfully connected to the database')
  }

  const app = express()

  routes.forEach((route) => {
    app.use(...route)
  })

  app.use(pinoHttpLogger)

  app.listen(config.app.port, () => {
    logger.info(`Server has successfully started on port ${config.app.port}`)
  })
}

try {
  bootstrap()
} catch (error) {
  logger.error(error)
}
