import { createContext } from 'react'

import { QueryPort } from '../types'

export const Context = createContext<null | QueryPort>(null)
