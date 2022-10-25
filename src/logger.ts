import pinoHttp from 'pino-http'
import pino from 'pino'
import pretty from 'pino-pretty'
import config from './config'

export const pinoHttpLogger = pinoHttp()

export const logger = !config.app.isProduction ? pino(pretty()) : pino()
