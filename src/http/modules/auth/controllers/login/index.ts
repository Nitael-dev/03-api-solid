import { WithBody } from '@http/shared/interfaces'
import { prisma } from '@lib/prisma'
import { User } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { authSchema } from '@auth/shared/schema'
import { compareSync } from 'bcrypt'

export async function loginController(
  req: FastifyRequest<WithBody<User>>,
  reply: FastifyReply,
) {
  // Schema
  const { email, password } = await authSchema(req.body)

  await prisma.user
    .findFirst({
      where: { email },
      select: null,
    })
    // @ts-ignore
    .then((data: User) => {
      if (compareSync(password, data.password_hash)) {
        // @ts-ignore
        delete data.password_hash
        return reply.status(200).send(data)
      }
    })
    .catch(() => {
      return reply.status(400).send({
        message: 'Invalid credentials',
      })
    })
}
