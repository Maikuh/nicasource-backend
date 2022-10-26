import { NextFunction, Request, Response } from 'express'
import { TokenExpiredError } from 'jsonwebtoken'
import { UnauthorizedException } from '../common/exceptions'
import { AppDataSource } from '../config/data-source'
import { User } from '../entities/User.entity'
import { verifyJwt } from '../utils/jwt.util'

const userRepository = AppDataSource.getRepository(User)

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  function sendUnauthorized () {
    next(new UnauthorizedException())
  }

  const bearerToken = req.header('Authorization')

  if (bearerToken == null)
    return sendUnauthorized()

  try {
    const data = verifyJwt(bearerToken?.split(' ').pop())

    const user = await userRepository.findOne({ where: { email: data.email } })

    if (user == null)
      return sendUnauthorized()

    req.user = user
    next()
  } catch (error) {
    if (error instanceof TokenExpiredError)
      return sendUnauthorized()
  }
}
