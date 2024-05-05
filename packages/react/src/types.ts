import { ChangeEvent, FocusEvent } from 'react'

import { ValidatorDefineRules } from '@declaform/core'

export type ExistsRule<T extends ValidatorDefineRules> =
  T extends Record<string, never> ? Record<string, NonNullable<unknown>> : T

export type DefineRule<
  N extends
    keyof ExistsRule<ValidatorDefineRules> = keyof ExistsRule<ValidatorDefineRules>
> = {
  [P in N]: {
    rule: P
  } & ExistsRule<ValidatorDefineRules>[P]
}[N]

export interface CommandPort {
  registerRule(name: string, rule: DefineRule): void
  emitChange(name: string, value: unknown): void
  emitBlur(name: string): void
  emitError(name: string, error: string[]): void
}

export interface QueryPort {
  ruleDefines: Record<string, DefineRule>
  fieldErrors: Record<string, string[]>
  currentData: Record<string, unknown>
  touchFields: Record<string, boolean>
}

export type InputRuleDefine<
  N extends
    keyof ExistsRule<ValidatorDefineRules> = keyof ExistsRule<ValidatorDefineRules>
> = { rule: N } & ExistsRule<ValidatorDefineRules>[N]

export type FormInputChangeEvent<E = HTMLInputElement> = ChangeEvent<E>
export type FormInputFocusEvent<E = HTMLInputElement> = FocusEvent<E>
