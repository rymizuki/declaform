import type { ValidatorErrorHandlerDefineFunction } from './types'
import { validator } from './validator'

export const defineErrorHandler: ValidatorErrorHandlerDefineFunction = (
  handler
) => {
  validator.errorHandler = handler
}
