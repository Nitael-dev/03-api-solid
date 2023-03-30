import { FastifyInstance, FastifyRequest } from 'fastify'
import { authSchema } from './transactions.schema'
import { prisma } from '@app'
import { User } from '@prisma/client'
import { WithBody } from '@interfaces/shared'
import { encryptUtil } from '@utils/encrypt'

export async function authRoutes(app: FastifyInstance) {
  app.post('/create', async (req: FastifyRequest<WithBody<User>>, reply) => {
    // Schema
    await authSchema.post(req.body, reply)

    const { email, password } = req.body

    const hash = encryptUtil.encrypt(password)

    console.log(email)

    await prisma.user
      .create({
        data: {
          email,
          password: hash,
        },
      })
      .then((data) => {
        // @ts-ignore
        delete data.password
        return reply.status(201).send(data)
      })
      .catch((err) => {
        if (err.code === 'P2002') {
          return reply.status(409).send({
            message: 'This e-mail is already registered!',
          })
        }
        return reply.status(500).send(err)
      })
  })

  app.post('/login', async (req: FastifyRequest<WithBody<User>>, reply) => {
    // Schema
    await authSchema.post(req.body, reply)

    const { email, password } = req.body

    await prisma.user
      .findFirst({
        where: { email },
        select: null,
      })
      // @ts-ignore
      .then((data: User) => {
        console.log(data)
        if (encryptUtil.decrypted(password, data.password)) {
          // @ts-ignore
          delete data.password
          return reply.status(200).send(data)
        }
      })
      .catch(() => {
        return reply.status(400).send({
          message: 'Invalid credentials',
        })
      })
  })
}
