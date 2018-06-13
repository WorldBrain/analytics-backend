import { AppComponents } from '../components'
import { TokenGenerator } from '../components/token-generator'
import { UserStorage } from '../components/storage/types'

export function generateToken(
    {TokenGenerator, AwsUserStorage}:
    {TokenGenerator: TokenGenerator, AwsUserStorage: UserStorage}
) {
    return async function handleGenerateTokenRequest({installTime}) {
        let id = TokenGenerator.generateToken()

        while(!(await AwsUserStorage.userExists(id))) {
            id = TokenGenerator.generateToken()
        }

        await AwsUserStorage.storeUser(id, installTime)
        
        return {id, installTime}
    }
}