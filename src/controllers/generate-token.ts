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

        let user
        try {
            user = await userStorage.storeUser(id, installTime)
        } catch(err) {
            return {
                "success": false,
                "message": err,
            }
        }
        
        return {...user, installTime: installTime}
    }
}