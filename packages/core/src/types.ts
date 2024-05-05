// external
export interface ValidatorDefineRules {
  [N: string]: { [P: string]: unknown }
}

type ExistsRule<T extends ValidatorDefineRules> =
  T extends Record<string, never> ? never : T
export interface ValidatorErrorHandler {
  (error: unknown): string[]
}
export interface ValidatorErrorHandlerDefineFunction {
  (handler: ValidatorErrorHandler): void
}

export type Data = Record<string, unknown>
export type ValidationResult =
  | { success: false; error: string[] }
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
  errorHandler: ValidatorErrorHandler
  validateField: <N extends keyof ValidatorDefineRules>(
    ruleName: N,
    value: unknown,
    currentData: Record<string, unknown>,
    context: {
      name: Exclude<N, number>
    } & ValidatorDefineRules[N]
  ) => ValidationResult
}
