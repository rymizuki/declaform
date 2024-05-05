import { createContext } from 'react'

import { CommandPort } from '../types'

export const Context = createContext<null | CommandPort>(null)
