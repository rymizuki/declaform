import { useContext } from 'react'

import { Context } from '../context/command'
import { DefineRule, InputRuleDefine } from '../types'

export function useFormInputRuleRegister() {
  const context = useContext(Context)
  const isRuleDefine = (define: unknown): define is DefineRule => {
    if (!define) return false
    if (!(typeof define === 'object')) return false
    if (!('rule' in define)) return false
    return true
  }

  const register = (name: string, define: InputRuleDefine) => {
    if (!context || !isRuleDefine(define)) return

    context.registerRule(name, define)
  }

  return {
    isRuleDefine,
    register
  }
}
