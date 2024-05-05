import { useContext } from 'react'

import { Context } from '../context/command'

export function useFormCommand() {
  const command = useContext(Context)
  if (!command) return

  const { emitChange, emitBlur, emitError } = command
  return {
    emitChange,
    emitBlur,
    emitError
  }
}
