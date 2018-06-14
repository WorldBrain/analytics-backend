import { AppComponents } from '../components'
import { TokenGenerator } from '../components/token-generator'
import { UserStorage } from '../components/storage/types'

export function generateToken(
    {tokenGenerator, userStorage}:
    {tokenGenerator: TokenGenerator, userStorage: UserStorage}
) {
    return async function handleGenerateTokenRequest({installTime}) {
        let id = tokenGenerator.generateToken()
        while((await userStorage.userExists(id))) {
            id = tokenGenerator.generateToken()
        }

        const user = await userStorage.storeUser(id, installTime)
        
        // Todo for other error messages        
        return {...user, installTime: installTime}
    }
}