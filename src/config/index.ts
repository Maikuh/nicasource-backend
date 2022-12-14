import 'dotenv/config'

export default {
  app: {
    port: process.env.PORT ?? 3000,
    isProduction: process.env.NODE_ENV === 'production',
    jwtSecret: process.env.JWT_SECRET ?? '',
  },
  db: {
    host: process.env.POSTGRES_HOST ?? 'localhost',
    username: process.env.POSTGRES_USERNAME ?? 'nicasource',
    password: process.env.POSTGRES_PASSWORD ?? 'nicasource',
    name: process.env.POSTGRES_DATABASE ?? 'videos_creator',
  },
}
