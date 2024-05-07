import { defineErrorHandler, defineValidationRule } from '@declaform/core'
import { ZodError } from 'zod'
import { passwordSchema, userIdSchema } from './schemas'

declare module '@declaform/core' {
  interface ValidatorDefineConfig {
    rules: {
      user_id: {}
      password: {}
      password_confirm: {
        ruleReferencePropName: string
      }
    }
    errorType: string
  }
}

defineErrorHandler<ZodError>((error) => {
  return error.issues.map((issue) => issue.message)
})

defineValidationRule('user_id', {
  validate(value) {
    return userIdSchema.safeParse(value)
  }
})

defineValidationRule('password', {
  validate(value) {
    return passwordSchema.safeParse(value)
  }
})

defineValidationRule('password_confirm', {
  validate(value, data, { ruleReferencePropName }) {
    return passwordSchema
      .refine((value) => value === data[ruleReferencePropName], {
        message: 'Password mismatch'
      })
      .safeParse(value)
  }
})
