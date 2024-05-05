import { useContext } from 'react'

import { validator } from '@declaform/core'

import { Context as CommandContext } from '../context/command'
import { Context as QueryContext } from '../context/query'

export function useFormValidator() {
  const command = useContext(CommandContext)
  const context = useContext(QueryContext)

  if (!context) return

  const validateField = <N extends keyof typeof context.ruleDefines>(
    name: N,
    value: unknown
  ) => {
    const define = context.ruleDefines[name]
    if (!define) return

    const rule = validator.rules[define.rule]
    if (!rule) {
      return
    }

    command.emitError(name, [])
    const ret = validator.validateField(
      define.rule,
      value,
      context.currentData,
      {
        ...define,
        name
      }
    )
    if (ret.success === false) {
      command.emitError(name, ret.error)
      return
    }
  }

  const validate = () => {
    Object.keys(context.touchFields).forEach((name) => {
      const value = context.currentData[name]
      validateField(name, value)
    })
  }

  return {
    validateField,
    validate
  }
}
