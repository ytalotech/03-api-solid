import 'dotenv/config'
import { z } from 'zod'
// irei validar um objeto pois nosso process.env é um objeto
const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
})

// safeParse vai validar o que especificamos no process.env
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
