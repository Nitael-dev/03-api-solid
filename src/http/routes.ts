import { FastifyInstance } from 'fastify'
import { router } from './modules/routes.module'

export function registerRoutes(app: FastifyInstance) {
  router.forEach((arr) => {
    app.register(arr[0], arr[1])
  })
}
