import type { ValidatorErrorHandler } from './types'
import { validator } from './validator'

export function defineErrorHandler<T = unknown>(
  handler: ValidatorErrorHandler<T>
) {
  validator.errorHandler = handler
}
