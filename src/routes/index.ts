import { Router } from 'express'
import indexRoutes from './root.route'
import usersRoutes from './users.route'

const routes: Record<string, Router> = {
  '/': indexRoutes,
  '/users': usersRoutes,
}

export default routes
