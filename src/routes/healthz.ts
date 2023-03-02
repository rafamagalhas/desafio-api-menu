import express from 'express'
import Healthz from '../controllers/healthz'

const routes = express.Router()

routes.get('/', Healthz.health);

export default routes
