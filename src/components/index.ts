import * as path from 'path'
import { TokenGenerator } from './token-generator'
import { AwsUserStorage, AwsEventLogStorage } from './storage'
import { UserStorage, EventLogStorage, UserDiskStorage, EventDiskStorage } from './storage'

export interface AppComponents {
    tokenGenerator: TokenGenerator,
    userStorage: UserStorage,
    eventLogStorage: EventLogStorage
}
export interface AppComponentsConfig {
    baseUrl : string
    awsBucket? : string
    overrides? : object
}

export function createAppComponents(config: AppComponentsConfig): AppComponents {
    function allowOverride<T>(name : string, _default : () => T) : T {
        const override = config.overrides && config.overrides[name]
        return override ? override : _default()
    }
    
    
    return {
        tokenGenerator: allowOverride('tokenGenerator', () => new TokenGenerator()),
        userStorage: allowOverride('userStorage', () => {
            if(config.awsBucket) {
                return new AwsUserStorage({bucketName: config.awsBucket})
            } else {
                return new UserDiskStorage({
                    basePath: path.join(__dirname, '../../public')
                })
            }
        }),
        eventLogStorage: allowOverride('eventLogStorage', () => {
            if(config.awsBucket) {
                return new AwsEventLogStorage({bucketName: config.awsBucket})
            } else {
                return new EventDiskStorage({
                    basePath: path.join(__dirname, '../../public')
                })
            }
        }),
    }
}