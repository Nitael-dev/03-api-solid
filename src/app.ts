import fastify from 'fastify'
import { authRoutes } from './routes/transactions/transactions'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

const app = fastify()

export default app

app.register(authRoutes, {
  prefix: '/auth',
})
