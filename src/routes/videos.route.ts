import { Router } from 'express'
import { NotFoundException } from '../common/exceptions'
import { AppDataSource } from '../config/data-source'
import { CreateVideoDTO } from '../dtos/create-video.dto'
import { UpdateVideoDTO } from '../dtos/update-video.dto'
import { VideoPubUnpubDTO } from '../dtos/video-pub-unpub.dto'
import { User } from '../entities/User.entity'
import { Video } from '../entities/Video.entity'
import authMiddleware from '../middlewares/auth.middleware'
import { responseWrapper } from '../middlewares/response-wrapper.middleware'
import { validateBody } from '../middlewares/validate-body.middleware'

const videosRoutes = Router()
const videoRepository = AppDataSource.getRepository(Video)

videosRoutes.get('/', authMiddleware, responseWrapper, async (req, res) => {
  const videos = await videoRepository.find({
    relations: ['creator', 'likedBy'],
    where: { published: true },
  })

  res.sendRes(videos)
})

videosRoutes.get('/:id', authMiddleware, responseWrapper, async (req, res) => {
  const video = await videoRepository.findOne({
    where: { id: req.params.id },
    relations: ['creator', 'likedBy'],
  })

  if (video == null) throw new NotFoundException('Video was not found')

  res.sendRes(video)
})

videosRoutes.post(
  '/',
  authMiddleware,
  validateBody(CreateVideoDTO),
  responseWrapper,
  async (req, res) => {
    const dto: CreateVideoDTO = req.body

    const newVideo = videoRepository.create({ ...dto, creator: req.user })

    await videoRepository.save(newVideo)

    res.status(201).sendRes(newVideo)
  }
)

videosRoutes.put(
  '/:id',
  authMiddleware,
  validateBody(UpdateVideoDTO),
  responseWrapper,
  async (req, res) => {
    const dto: UpdateVideoDTO = req.body

    const video = await videoRepository.findOneBy({ id: req.params.id })

    if (video == null) throw new NotFoundException('Video was not found')

    const updatedVideo = await videoRepository.save({ ...video, ...dto })

    res.sendRes(updatedVideo)
  }
)

videosRoutes.put(
  '/:id/publish',
  authMiddleware,
  validateBody(VideoPubUnpubDTO),
  responseWrapper,
  async (req, res) => {
    const dto: VideoPubUnpubDTO = req.body

    const newVideo = await videoRepository.save({ id: req.params.id, ...dto })

    res.json(newVideo)
  }
)

videosRoutes.get('/:id/like', authMiddleware, async (req, res) => {
  const id = req.params.id

  const video = await videoRepository.findOne({
    where: { id },
    relations: ['likedBy'],
  })

  if (video == null) throw new NotFoundException('Video not found')

  if (video.likedBy.findIndex(user => user.id === req.user?.id) === -1) {
    video.likedBy.push(req.user as User)
    res.send({ message: 'Video liked' })
  } else {
    video.likedBy = video.likedBy.filter(user => user.id !== req.user?.id)
    res.send({ message: 'Video unliked' })
  }

  await videoRepository.save(video)
})

export default videosRoutes
