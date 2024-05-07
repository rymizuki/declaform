import { useContext } from 'react'
import { Context } from '../context/query'

export const useFormErrors = () => {
  const context = useContext(Context)

  const getErrorsByName = (name: string) => {
    if (!context) return []
    if (!context.fieldErrors[name]) return []
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return context.fieldErrors[name]
  }

  const getErrors = () => {
    return context?.fieldErrors ?? {}
  }

  return {
    getErrors,
    getErrorsByName
  }
}
