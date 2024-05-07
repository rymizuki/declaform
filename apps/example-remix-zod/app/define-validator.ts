import { defineErrorHandler, defineValidationRule } from '@declaform/core'
import { ZodError } from 'zod'
import { passwordSchema, userIdSchema } from './schemas'

declare module '@declaform/core' {
  interface ValidatorDefineConfig {
    rules: {
      user_id: {}
      password: {}
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
