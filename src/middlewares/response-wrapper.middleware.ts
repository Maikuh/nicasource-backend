import { instanceToPlain } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'

export function responseWrapper (
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.sendRes = <T>(body: T | T[]) => {
    res.json(transform(body))
  }

  next()
}

function transform<T> (body: T | T[]) {
  return Array.isArray(body)
    ? body.map((item) => instanceToPlain(item))
    : instanceToPlain(body)
}
