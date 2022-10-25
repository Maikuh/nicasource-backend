import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { User } from '../entities/User.entity'

export function generateJwt (user: User) {
  return jwt.sign({ email: user.email }, config.app.jwtSecret, {
    expiresIn: '30m'
  })
}

export function verifyJwt (token = '') {
  return jwt.verify(token, config.app.jwtSecret) as JwtPayload & User
}
