export default {
  app: {
    port: process.env.PORT ?? 3000,
    isProduction: process.env.NODE_ENV === 'production'
  },
  db: {
    username: process.env.POSTGRES_USERNAME ?? 'nicasource',
    password: process.env.POSTGRES_PASSWORD ?? 'nicasource',
    name: process.env.POSTGRES_DATABASE ?? 'videos_creator',
  },
}
