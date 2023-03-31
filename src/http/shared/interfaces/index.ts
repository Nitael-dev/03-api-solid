import {
  FastifyPluginOptions,
  FastifyRegisterOptions,
  FastifyInstance,
} from 'fastify'

export interface WithParams<PrismaType> {
  Params: PrismaType
}

export interface WithBody<PrismaType> {
  Body: PrismaType
}

export interface RegisterProps {
  opts: FastifyRegisterOptions<FastifyPluginOptions>
  plugins: FastifyInstance[]
}
