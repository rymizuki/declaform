import {
  FormEvent,
  ReactElement,
  RefObject,
  useMemo,
  useRef,
  useState
} from 'react'
import { getLogger } from '@declaform/core'

import { Context as CommandContext } from '../context/command'
import { Context as QueryContext } from '../context/query'
import { CommandPort, FieldErrorMap, QueryPort } from '../types'

type Props = {
  children: (props: {
    ref: RefObject<HTMLFormElement>
    hasError: boolean
    isTouched: () => boolean
    onSubmit: (ev: FormEvent<HTMLFormElement>) => void
  }) => ReactElement
  onSubmit?: (ev: FormEvent<HTMLFormElement>) => void
}

export const Provider = ({ children: renderProp, onSubmit }: Props) => {
  const ref = useFormRef()
  const ruleDefines = useRef<QueryPort['ruleDefines']>({})
  const touchFields = useRef<Record<string, boolean>>({})
  const isTouched = () => {
    return 0 < Object.keys(touchFields.current).length
  }

  const registerRule: CommandPort['registerRule'] = (name, rule) => {
    getLogger().debug(
      '[declaform][provider] init',
      name,
      rule,
      ruleDefines.current[name]
    )
    ruleDefines.current[name] = rule
  }

  const emitChange: CommandPort['emitChange'] = (name, value) => {
    getLogger().debug('[declaform][provider] change', name, value)
  }
  const emitBlur: CommandPort['emitBlur'] = (name) => {
    getLogger().debug('[declaform][provider] blur', name)
    touchFields.current[name] = true
  }
  const [fieldErrors, setFieldErrors] = useState<FieldErrorMap>({})
  const emitError: CommandPort['emitError'] = (name, error) => {
    getLogger().debug('[declaform][provider] error', name, error)
    fieldErrors[name] = error
    setFieldErrors({ ...fieldErrors })
  }
  const hasError = useMemo(() => {
    return (
      0 <
      Object.keys(fieldErrors).filter((prop) => 0 < fieldErrors[prop]?.length)
        .length
    )
  }, [fieldErrors])

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    getLogger().debug('[declaform][provider] submit', ev)
    onSubmit && onSubmit(ev)
  }

  return (
    <CommandContext.Provider
      value={{
        registerRule,
        emitChange,
        emitBlur,
        emitError
      }}
    >
      <QueryContext.Provider
        value={{
          get currentData() {
            if (!ref.current) {
              throw new Error('form ref is not defined')
            }
            return parseFormData(new FormData(ref.current))
          },
          fieldErrors,
          ruleDefines: ruleDefines.current,
          touchFields: touchFields.current
        }}
      >
        {renderProp({ onSubmit: handleSubmit, ref, hasError, isTouched })}
      </QueryContext.Provider>
    </CommandContext.Provider>
  )
}

function useFormRef() {
  return useRef<HTMLFormElement>(null)
}

function parseFormData(formData: FormData) {
  const data: Record<string, unknown> = {}

  for (const prop of formData.keys()) {
    const values = formData.getAll(prop)
    data[prop] = values.length === 1 ? values[0] : values
  }

  return data
}
