import { FastifyReply } from 'fastify'
import z from 'zod'

class AuthSchema {
  post(body: any, reply: FastifyReply) {
    const schema = z
      .object({
        email: z.string().email(),
        password: z.string().min(8),
      })
      .safeParse(body)

    if (!schema.success) {
      console.log(schema.error.format())
      return reply.status(400).send(schema.error.format())
    }
  }
}

export const authSchema = new AuthSchema()
