import { AppDataSource } from '../config/data-source'
import { User } from '../entities/User.entity'
import { faker } from '@faker-js/faker'
import { UserRole } from '../enums/user-role.enum'
import { logger } from '../logger'
import { DEFAULT_USER_PASSWORD } from './user.constant'

export async function seedUsers () {
  logger.info('Seeding users...')

  const userRepository = AppDataSource.getRepository(User)

  const users: User[] = []

  for (let i = 0; i < 10; i++) {
    users.push(
      userRepository.create({
        email: faker.internet.email(),
        name: faker.name.fullName(),
        password: DEFAULT_USER_PASSWORD,
        photoUrl: faker.image.avatar(),
        followers: [],
        role: i % 2 === 0 ? UserRole.STUDENT : UserRole.TEACHER,
      })
    )

    if (i > 0) for (let j = 0; j < i; j++) users[i].followers.push(users[j])
  }

  return await userRepository.save(users)
}
