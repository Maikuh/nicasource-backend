import 'reflect-metadata'
import { DataSource } from 'typeorm'
import config from '.'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: 5432,
  username: config.db.username,
  password: config.db.password,
  database: config.db.name,
  synchronize: false,
  logging: false,
  entities: ['../**/*.entity.ts'],
  migrations: ['migrations/*.ts'],
  subscribers: ['src/subscribers/*.ts'],
})
