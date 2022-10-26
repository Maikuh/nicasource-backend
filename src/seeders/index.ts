import { AppDataSource } from '../config/data-source'
import { logger } from '../logger'
import { DEFAULT_USER_PASSWORD } from './user.constant'
import { seedUsers } from './users.seeder'
import { seedVideos } from './videos.seeder'

async function seedDatabase () {
  logger.info('Starting database seeding.')

  await AppDataSource.initialize()

  if (AppDataSource.isInitialized)
    logger.info('Successfully connected to the database')
  else
    return logger.error(
      'An error occurred while connecting to the database. Aborting.'
    )

  const users = await seedUsers()
  await seedVideos(users)

  logger.info('Done!')

  logger.info(
    `Use email "${users[0].email}" for Student role or "${users[1].email}" for Teacher role.
    Default password is "${DEFAULT_USER_PASSWORD}"`
  )
  process.exit()
}

seedDatabase().catch(console.error)
