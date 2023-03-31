import { registerRoutes } from '@http/routes'
import fastify from 'fastify'

const app = fastify()

registerRoutes(app)

export default app
