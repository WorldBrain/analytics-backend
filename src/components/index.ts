import * as path from 'path'
import { TokenGenerator } from './token-generator'
import { AwsUserStorage, AwsEventLogStorage } from './storage'
import { UserStorage, EventLogStorage, UserDiskStorage, EventDiskStorage } from './storage'
import { CountlyEventLogStorage } from './storage/countly';

export interface AppComponents {
    tokenGenerator: TokenGenerator,
    userStorage: UserStorage,
    eventLogStorage: EventLogStorage
}
export interface AppComponentsConfig {
    baseUrl : string
    countlyUrl? : string
    countlyAppKey? : string
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
            if (config.countlyUrl && config.countlyAppKey) {
                return new CountlyEventLogStorage({ countlyUrl: config.countlyUrl, countlyAppKey: config.countlyAppKey })
            } else if(config.awsBucket) {
                return new AwsEventLogStorage({bucketName: config.awsBucket})
            } else {
                return new EventDiskStorage({
                    basePath: path.join(__dirname, '../../public')
                })
            }
        }),
    }
}