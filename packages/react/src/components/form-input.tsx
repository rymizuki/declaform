import { ReactElement, useEffect, useMemo } from 'react'

import { useFormCommand } from '../hooks/use-form-command'
import { useFormErrors } from '../hooks/use-form-errors'
import { useFormInputRuleRegister } from '../hooks/use-form-input-rule-register'
import { useFormValidator } from '../hooks/use-form-validator'
import {
  ErrorTypes,
  FormInputChangeEvent,
  FormInputFocusEvent,
  InputRuleDefine,
  Rules
} from '../types'

type InputElementProp = (
  props: {
    name: string
    required: boolean
    onChange: (ev: FormInputChangeEvent) => void
    onBlur: (ev: FormInputFocusEvent) => void
  },
  errors: ErrorTypes
) => ReactElement

type Props<N extends keyof Rules> = {
  children: InputElementProp
  name: string
  required?: boolean
} & InputRuleDefine<N>

export const FormInput = <N extends keyof Rules>({
  children: renderProp,
  name,
  required = false,
  ...ruleDefine
}: Props<N>) => {
  const { register } = useFormInputRuleRegister()
  const command = useFormCommand()
  const formError = useFormErrors()
  const validator = useFormValidator()

  useEffect(() => {
    register(name, ruleDefine)
  }, [])

  const createChangeHandler = (
    onChange?: (ev: FormInputChangeEvent) => void
  ) => {
    return (ev: FormInputChangeEvent) => {
      const { name, value } = ev.target
      command?.emitChange(name, value)
      console.debug('[declaform][form-input] change', name, value)
      validator.validateField(name, value)
      onChange && onChange(ev)
    }
  }
  const createBlurHandler = (onBlur?: (ev: FormInputFocusEvent) => void) => {
    return (ev: FormInputFocusEvent) => {
      const { name } = ev.target
      console.debug('[declaform][form-input] blur', name)
      command?.emitBlur(name)
      validator.validate()
      onBlur && onBlur(ev)
    }
  }

  const errors = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return formError.getErrorsByName(name)
  }, [name, formError])

  return renderProp(
    {
      name,
      required,
      onChange: createChangeHandler(),
      onBlur: createBlurHandler()
    },
    errors
  )
}
