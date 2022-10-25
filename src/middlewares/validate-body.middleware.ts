import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { BadRequestException } from '../common/exceptions'
import { logger } from '../logger'

export function validateBody (targetClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    req.body = Object.setPrototypeOf(req.body, targetClass.prototype)

    const errors = await validate(req.body, {
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: { target: false }
    })

    if (errors.length > 0) {
      logger.debug(errors)

      next(
        new BadRequestException(
          errors.flatMap((error) => Object.values(error.constraints as any)),
          'Validation Errors'
        )
      )
    }

    req.body = plainToInstance(targetClass, req.body)
    next()
  }
}
