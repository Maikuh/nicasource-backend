import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { BadRequestException } from '../common/exceptions'
import { isSerializable } from '../common/utils/shared.utils'

export function validateBody (targetClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!isSerializable(req.body))
      throw new BadRequestException('Invalid request body')

    req.body = Object.setPrototypeOf(req.body, targetClass.prototype)

    const errors = await validate(req.body, {
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: { target: false },
    })

    if (errors.length > 0)
      throw new BadRequestException(
        errors.flatMap(error => Object.values(error.constraints as any)),
        'Validation Errors'
      )

    req.body = plainToInstance(targetClass, req.body)
    next()
  }
}
