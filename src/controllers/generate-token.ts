import { AppComponents } from '../components'
import { TokenGenerator } from '../components/token-generator'
import { UserStorage } from '../components/storage/types'

export function generateToken(
    {tokenGenerator, AwsUserStorage}:
    {tokenGenerator: TokenGenerator, AwsUserStorage: UserStorage}
) {
    return async function handleGenerateTokenRequest({installTime}) {
        let id = tokenGenerator.generateToken()

        while(!(await AwsUserStorage.isUserById(id))) {
            id = tokenGenerator.generateToken()
        }

        await AwsUserStorage.storeUser(id, installTime)
        
        return {id, installTime}
    }
}