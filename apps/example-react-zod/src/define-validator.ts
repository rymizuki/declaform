import { defineErrorHandler, defineValidationRule } from '@declaform/core'
import { ZodError, z } from 'zod'

declare module '@declaform/core' {
  interface ValidatorDefineRules {
    user_id: {}
    user_name: {}
    password: {}
    password_confirm: {
      ruleTargetPropName: string
    }
  }

  interface ValidatorDefineConfig {
    errorType: string
  }
}

defineErrorHandler<ZodError>((error) => {
  return error.issues.map((issue) => issue.message)
})

defineValidationRule('user_id', {
  validate(value) {
    return z.string().min(1).max(64).safeParse(value)
  }
})
defineValidationRule('user_name', {
  validate(value) {
    return z.string().min(1).max(32).safeParse(value)
  }
})

const passwordSchema = z
  .string()
  .min(8)
  .max(64)
  .regex(/^[a-zA-Z0-9.?/-]+$/)
defineValidationRule('password', {
  validate(value) {
    return passwordSchema.safeParse(value)
  }
})
defineValidationRule('password_confirm', {
  validate(value, data, { ruleTargetPropName }) {
    return passwordSchema
      .refine(() => value === data[ruleTargetPropName], {
        message: 'Password mismatch'
      })
      .safeParse(value)
  }
})
