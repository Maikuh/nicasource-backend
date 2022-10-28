import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { User } from '../entities/User.entity'

export function generateJwt (user: User) {
  const expiresIn = 60 * 30 // 30 minutes
  const token = jwt.sign({ email: user.email }, config.app.jwtSecret, {
    expiresIn,
  })

  return {
    token,
    exp: Math.floor(Date.now() / 1000) + expiresIn
  }
}

export function verifyJwt (token = '') {
  return jwt.verify(token, config.app.jwtSecret) as JwtPayload & User
}
