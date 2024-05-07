import type {
  DefineValidationRuleInterface,
  ValidatorDefineConfig
} from './types'
import { validator } from './validator'

export function defineValidationRule<
  N extends keyof ValidatorDefineConfig['rules'],
  R extends DefineValidationRuleInterface<N>
>(name: N, rule: R) {
  // XXX: By default, rule object contents is "never". rule type defined empty object({}).
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  validator.rules[name] = rule
}
