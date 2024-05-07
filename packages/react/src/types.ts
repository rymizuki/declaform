import { ChangeEvent, FocusEvent } from 'react'

import { ValidatorDefineConfig } from '@declaform/core'

export type Rules = ValidatorDefineConfig['rules']

export type ExistsRule<T extends Rules> =
  T extends Record<string, never> ? Record<string, NonNullable<unknown>> : T

export type DefineRule<N extends keyof Rules = keyof Rules> = {
  [P in N]: {
    rule: P
  } & Rules[P]
}[N]

export type ErrorTypes = ValidatorDefineConfig['errorType'][]

export interface CommandPort {
  registerRule(name: string, rule: DefineRule): void
  emitChange(name: string, value: unknown): void
  emitBlur(name: string): void
  emitError(name: string, error: ErrorTypes): void
}

export type FieldErrorMap = Record<string, ErrorTypes>

export interface QueryPort {
  ruleDefines: Record<string, DefineRule>
  fieldErrors: FieldErrorMap
  currentData: Record<string, unknown>
  touchFields: Record<string, boolean>
}

export type InputRuleDefine<N extends keyof Rules = keyof Rules> = {
  rule: N
} & Rules[N]

export type FormInputChangeEvent<E = HTMLInputElement> = ChangeEvent<E>
export type FormInputFocusEvent<E = HTMLInputElement> = FocusEvent<E>
