// external
export interface ValidatorDefineRules {
  [N: string]: { [P: string]: unknown }
}

type DefaultValidatorDefineConfig = {
  errorType: unknown
}
export interface ValidatorDefineConfig extends DefaultValidatorDefineConfig {}

type ErrorType = ValidatorDefineConfig['errorType']
type ErrorTypes = ErrorType[]
type ExistsRule<T extends ValidatorDefineRules> =
  T extends Record<string, never> ? never : T
export interface ValidatorErrorHandler<T = unknown> {
  (error: T): ErrorTypes
}

export type Data = Record<string, unknown>
export type ValidationResult =
  | { success: false; error: ErrorTypes }
  | { success: true }
export interface DefineValidationRuleInterface<
  N extends keyof ExistsRule<ValidatorDefineRules>
> {
  validate(
    value: unknown,
    currentData: Data,
    context: { name: string } & ExistsRule<ValidatorDefineRules>[N]
  ): { success: false; error: unknown } | { success: true }
}

export interface ValidatorInterface {
  rules: {
    [N in keyof ExistsRule<ValidatorDefineRules>]?: DefineValidationRuleInterface<N>
  }
  errorHandler: ValidatorErrorHandler<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  validateField: <N extends keyof ValidatorDefineRules>(
    ruleName: N,
    value: unknown,
    currentData: Record<string, unknown>,
    context: {
      name: Exclude<N, number>
    } & ValidatorDefineRules[N]
  ) => ValidationResult
}
