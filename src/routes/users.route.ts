import { Router } from 'express'
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '../common/exceptions'
import { AppDataSource } from '../config/data-source'
import { CreateUserDTO } from '../dtos/create-user.dto'
import Follows from '../entities/Follows.entity'
import { User } from '../entities/User.entity'
import authMiddleware from '../middlewares/auth.middleware'
import { responseWrapper } from '../middlewares/response-wrapper.middleware'
import { validateBody } from '../middlewares/validate-body.middleware'
import { generateJwt } from '../utils/jwt.util'

const usersRoutes = Router()
const userRepository = AppDataSource.getRepository(User)
const followsRepository = AppDataSource.getRepository(Follows)

usersRoutes.post(
  '/register',
  validateBody(CreateUserDTO),
  async (req, res, next) => {
    const { body } = req

    const existingUser = await userRepository.findOne({
      where: { email: body.email },
    })

    if (existingUser != null)
      throw new ConflictException(
        'The email is already taken. Please use another one.'
      )

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

  if (!passwordsMatch)
    throw new BadRequestException('Invalid email or password')

  res.json({
    access_token: generateJwt(user),
  })
})

usersRoutes.get('/me', authMiddleware, responseWrapper, async (req, res) => {
  const user = await userRepository.findOne({
    where: { email: req.user?.email },
    relations: ['videos', 'likes'],
  })

  res.sendRes(user)
})

usersRoutes.get('/:id/follow', authMiddleware, async (req, res) => {
  const followersId = req.user?.id
  const creatorsId = req.params.id

  if (followersId === creatorsId)
    throw new BadRequestException('You cannot follow yourself')

  const creator = await userRepository.findBy({ id: creatorsId })

  if (creator == null) throw new NotFoundException('The creator was not found')

  const alreadyFollowing = await followsRepository.findOne({
    where: { creator_id: creatorsId, follower_id: followersId },
  })

  if (alreadyFollowing != null) {
    await followsRepository.remove(alreadyFollowing)
    res.json({ message: 'Unfollowed creator' })
  } else {
    const newFollow = followsRepository.create({
      creator_id: creatorsId,
      follower_id: followersId,
    })

    await followsRepository.save(newFollow)

    res.json({ message: 'Followed creator' })
  }
})

export default usersRoutes
