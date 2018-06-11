import { AppComponents } from '../../components'
import * as generateToken from './generate-token'
import * as eventLog from './eventlog'
import * as uninstall from './uninstall'
import { AppControllers } from '../../controllers'

export type RouteHandler = ({req, res}) => void

export interface AppRoutes {
    generateToken : RouteHandler,
    eventLog: RouteHandler,
    uninstall: RouteHandler,
}

export function createAppRoutes(appControllers: AppControllers) : AppRoutes {
  return {
    generateToken: generateToken.generateToken(appControllers),
    eventLog: eventLog.eventLog(appControllers),
    uninstall: uninstall.uninstall(appControllers)
  }
}
