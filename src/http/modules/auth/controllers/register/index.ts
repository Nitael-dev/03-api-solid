import { WithBody } from '@http/shared/interfaces'
import { prisma } from '@lib/prisma'
import { User } from '@prisma/client'
import { hashSync } from 'bcrypt'
import { FastifyReply, FastifyRequest } from 'fastify'
import { authSchema } from '../../shared/schema'

export async function registerController(
  req: FastifyRequest<WithBody<User>>,
  reply: FastifyReply,
) {
  // Schema
  const { email, password, name } = await authSchema(req.body)

  const hashPassword = hashSync(password, 6)

  await prisma.user
    .create({
      data: {
        email,
        name: name ?? '',
        password_hash: hashPassword,
      },
    })
    .then((data) => {
      // @ts-ignore
      delete data.password_hash
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
}
