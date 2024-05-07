import { z } from 'zod'

export const userIdSchema = z.string().email().min(1).max(255)

export const passwordSchema = z
  .string()
  .min(8)
  .max(64)
  .regex(
    /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@;:])|(?=.*[A-Z])(?=.*[0-9])(?=.*[!@;:])|(?=.*[a-z])(?=.*[0-9])(?=.*[!@;:]))([a-zA-Z0-9!@;:]){8,}$/
  )

export const CSRFTokenSchema = z.string()

export const loginSchema = z.object({
  username: userIdSchema,
  password: passwordSchema
})
