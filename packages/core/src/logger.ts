import { LoggerInterface } from './types'

const logLevels = ['debug', 'info', 'warning', 'error'] as const

const defaults: {
  logLevel: (typeof logLevels)[number]
  logger: LoggerInterface
} = {
  logLevel: 'info',
  logger: {
    debug(format, ...args) {
      if (defaults.logLevel !== 'debug') return
      console.debug(format, ...args)
    },
    info(format, ...args) {
      if (['warning', 'error'].includes(defaults.logLevel)) return
      console.info(format, ...args)
    },
    warning(format, ...args) {
      if ('error' === defaults.logLevel) return
      console.info(format, ...args)
    },
    error(format, ...args) {
      console.info(format, ...args)
    }
  }
}

const setLoggerLevel = (logLevel: (typeof logLevels)[number]) => {
  defaults.logLevel = logLevel
}

const setLogger = (logger: LoggerInterface) => {
  defaults.logger = logger
}

const getLogger = () => {
  return defaults.logger
}

export { setLoggerLevel, setLogger, getLogger }
