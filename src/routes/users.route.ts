import { Router } from 'express'
import { BadRequestException, ConflictException } from '../common/exceptions'
import { AppDataSource } from '../config/data-source'
import { CreateUserDTO } from '../dtos/create-user.dto'
import { User } from '../entities/User.entity'
import authMiddleware from '../middlewares/auth.middleware'
import { responseWrapper } from '../middlewares/response-wrapper.middleware'
import { validateBody } from '../middlewares/validate-body.middleware'
import { generateJwt } from '../utils/jwt.util'

const usersRoutes = Router()
const userRepository = AppDataSource.getRepository(User)

usersRoutes.post(
  '/register',
  validateBody(CreateUserDTO),
  async (req, res, next) => {
    const { body } = req

    const existingUser = await userRepository.findOne({
      where: { email: body.email },
    })

    if (existingUser != null) {
      throw new ConflictException(
        'The email is already taken. Please use another one.'
      )
    }

    const newUser = userRepository.create(body)

    await userRepository.save(newUser)

    res.status(201).json({
      access_token: generateJwt(newUser as any),
    })
  }
)

usersRoutes.post('/login', async (req, res, next) => {
  const { body } = req

  const user = await userRepository.findOne({
    where: { email: body.email },
  })

  if (user == null) throw new BadRequestException('Invalid email or password')

  const passwordsMatch = await user.comparePassword(body.password)

  if (!passwordsMatch) {
    throw new BadRequestException('Invalid email or password')
  }

  res.json({
    access_token: generateJwt(user),
  })
})

usersRoutes.get(
  '/profile',
  authMiddleware,
  responseWrapper,
  async (req, res) => {
    res.sendRes(req.user)
  }
)

export default usersRoutes
