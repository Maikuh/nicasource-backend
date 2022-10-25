import { Router } from 'express'
import indexRoutes from './root'
import userRoutes from './user'

const routes: Array<[string, Router]> = [
  ['/', indexRoutes],
  ['/users', userRoutes]
]

export default routes
