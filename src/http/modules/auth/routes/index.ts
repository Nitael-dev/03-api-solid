import { FastifyInstance } from 'fastify'

import { loginController } from '@http/modules/auth/controllers/login'
import { registerController } from '@http/modules/auth/controllers/register'
import { withRoutes } from '@http/shared/utils/with-routes'

async function registerRoutes(app: FastifyInstance) {
  app.post('/create', registerController)
  app.post('/login', loginController)
}

export default withRoutes(registerRoutes, {
  prefix: '/auth',
})
