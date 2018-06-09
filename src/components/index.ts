import { TokenGenerator } from './token-generator'
import { AwsUserStorage, AwsEventLogStorage } from './storage'
import { UserStorage, EventLogStorage } from './storage'

export interface AppComponents {
    tokenGenerator: TokenGenerator,
    AwsUserStorage: UserStorage,
    AwsEventLogStorage: EventLogStorage
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
        AwsUserStorage: allowOverride('awsUserStorage', () => new AwsUserStorage({bucketName: config.awsBucket})),
        AwsEventLogStorage: allowOverride('AwsEventLogStorage', () => new AwsEventLogStorage({bucketName: config.awsBucket})),
    }
}