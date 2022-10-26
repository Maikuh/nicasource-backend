import pino from 'pino'
import pretty from 'pino-pretty'
import config from './config'

export const logger = !config.app.isProduction
  ? pino({ level: config.app.isProduction ? 'info' : 'debug' }, pretty())
  : pino({ level: config.app.isProduction ? 'info' : 'debug' })
