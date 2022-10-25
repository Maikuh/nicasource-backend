import { Router } from 'express'
import indexRoutes from './root'

const routes: Array<[string, Router]> = [['/', indexRoutes]]

export default routes
