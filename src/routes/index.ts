import userRoutes from './user'
import healthzRoutes from './healthz'
import menuRoutes from './menu'
import { Router } from 'express'


const routes: Router = Router();

routes.use('/user', userRoutes)
routes.use('/health', healthzRoutes)
routes.use('/menu', menuRoutes)


export { routes };