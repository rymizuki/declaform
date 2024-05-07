import { defineErrorHandler, defineValidationRule } from '@declaform/core'
import { ZodError } from 'zod'
import { passwordSchema, userIdSchema } from './schemas'

declare module '@declaform/core' {
  interface ValidatorDefineRules {
    user_id: {}
    password: {}
  }
}

defineErrorHandler((error: ZodError) => {
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
