import 'reflect-metadata'
import { DataSource } from 'typeorm'
import config from '.'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: config.db.username,
  password: config.db.password,
  database: config.db.name,
  synchronize: true,
  logging: false,
  entities: ['../**/*.entity.ts'],
  migrations: [],
  subscribers: [],
})
