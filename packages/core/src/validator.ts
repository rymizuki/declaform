import type { ValidatorDefineRules, ValidatorInterface } from './types'

export const validator: ValidatorInterface = {
  rules: {},
  errorHandler(
    error: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ) {
    return [`${error}`]
  },
  validateField<N extends keyof ValidatorDefineRules>(
    ruleName: N,
    value: unknown,
    currentData: Record<string, unknown>,
    context: {
      name: Exclude<N, number>
    } & ValidatorDefineRules[N]
  ) {
    const rule = this.rules[ruleName]
    if (!rule) {
      throw new Error(
        `validator rule is not defined, executed by "${ruleName}"`
      )
    }
    const ret = rule.validate(value, currentData, context)
    if (ret.success === false) {
      return {
        success: false,
        error: this.errorHandler(ret.error)
      }
    }
    return {
      success: true
    }
  }
}
