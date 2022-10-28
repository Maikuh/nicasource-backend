import { AppDataSource } from '../config/data-source'
import { faker } from '@faker-js/faker'
import { Video } from '../entities/Video.entity'
import { User } from '../entities/User.entity'
import videoUrlsConstant from './video-urls.constant'
import { logger } from '../logger'

export async function seedVideos (users: User[]) {
  logger.info('Seeding videos...')

  const videoRepository = AppDataSource.getRepository(Video)

  const videos: Video[] = []

  for (let i = 0; i < 20; i++)
    videos.push(
      videoRepository.create({
        creator: users[Math.floor(i / 2)],
        title: faker.random.words(4),
        srcUrl: videoUrlsConstant[i],
        published: i % 2 === 0,
        likedBy: users.slice(0, Math.ceil(i / 2)),
      })
    )

  return await videoRepository.save(videos)
}
