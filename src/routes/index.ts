import { Router } from 'express'
import indexRoutes from './root.route'
import usersRoutes from './users.route'
import videosRoutes from './videos.route'

const routes: Record<string, Router> = {
  '/': indexRoutes,
  '/users': usersRoutes,
  '/videos': videosRoutes
}

export default routes
