import { CustomError } from '@http/shared/utils/custom-error'
import z from 'zod'

export const authSchema = (body: any) => {
  const schema = z
    .object({
      email: z.string().email(),
      password: z.string().min(8),
      name: z.string().min(2).optional(),
    })
    .safeParse(body)
  if (!schema.success) {
    console.log(schema.error.format())
    throw new CustomError({
      statusCode: 400,
      message: 'Invalid payload!',
      error: schema.error,
    })
  }
  return schema.data
}
