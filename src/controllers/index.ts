import { AppComponents } from '../components'
import * as generateToken from './generate-token'
import * as eventLog from './eventlog'

export interface AppControllers {
    generateToken : Function,
    eventLog: Function
}

export function createAppControllers(appComponents : AppComponents) : AppControllers {
    return {
        generateToken: generateToken.generateToken(),
        eventLog: eventLog.eventLog()
    }
}