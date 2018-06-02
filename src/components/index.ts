import { TokenGenerator } from './token-generator'

export interface AppComponents {
    tokenGenerator: TokenGenerator
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
        tokenGenerator: allowOverride('tokenGenerator', () => new TokenGenerator())
    }
}