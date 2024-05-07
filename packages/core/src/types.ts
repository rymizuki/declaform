// external
type DefaultValidatorDefineConfig = {
  rules: Record<string, Record<string, unknown>>
  errorType: unknown
}
export interface ValidatorDefineConfig extends DefaultValidatorDefineConfig {}

type Rules = ValidatorDefineConfig['rules']
type ErrorType = ValidatorDefineConfig['errorType']
type ErrorTypes = ErrorType[]
// type ExistsRule<T extends Rules> =
//   T extends Record<string, never> ? never : T

export interface ValidatorErrorHandler<T = unknown> {
  (error: T): ErrorTypes
}

export type Data = Record<string, unknown>
export type ValidationResult =
  | { success: false; error: ErrorTypes }
  | { success: true }
export interface DefineValidationRuleInterface<N extends keyof Rules> {
  validate(
    value: unknown,
    currentData: Data,
    context: { name: string } & Rules[N]
  ): { success: false; error: unknown } | { success: true }
}

export interface ValidatorInterface {
  rules: {
    [N in keyof Rules]?: DefineValidationRuleInterface<N>
  }
  errorHandler: ValidatorErrorHandler<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  validateField: <N extends keyof Rules>(
    ruleName: N,
    value: unknown,
    currentData: Record<string, unknown>,
    context: {
      name: Exclude<N, number>
    } & Rules[N]
  ) => ValidationResult
}
