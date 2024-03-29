import { config } from 'dotenv'
import z from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z
  .object({
    NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
    PORT: z.coerce.number().default(3333),
  })
  .safeParse(process.env)

if (!envSchema.success) {
  console.log('🤨', envSchema.error.format())
  throw new Error(JSON.stringify(envSchema.error))
}

export const env = envSchema.data
