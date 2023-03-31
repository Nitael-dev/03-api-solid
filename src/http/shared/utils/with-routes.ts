import {
  FastifyPluginOptions,
  FastifyRegisterOptions,
  FastifyPluginCallback,
} from 'fastify'

export function withRoutes(
  app: FastifyPluginCallback,
  opts: FastifyRegisterOptions<FastifyPluginOptions>,
): [FastifyPluginCallback, FastifyRegisterOptions<FastifyPluginOptions>] {
  return [app, opts]
}
