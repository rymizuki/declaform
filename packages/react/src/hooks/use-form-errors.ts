import { useContext } from 'react'
import { Context } from '../context/query'

export const useFormErrors = () => {
  const context = useContext(Context)

  const getErrorsByName = (name: string) => {
    return context?.fieldErrors[name] ?? []
  }

  const getErrors = () => {
    return context?.fieldErrors ?? {}
  }

  return {
    getErrors,
    getErrorsByName
  }
}
