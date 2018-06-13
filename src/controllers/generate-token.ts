import { AppComponents } from '../components'
import { TokenGenerator } from '../components/token-generator'
import { UserStorage } from '../components/storage/types'

export function generateToken(
    {tokenGenerator, userStorage}:
    {tokenGenerator: TokenGenerator, userStorage: UserStorage}
) {
    return async function handleGenerateTokenRequest({installTime}) {
        let id = tokenGenerator.generateToken()
        console.log('Here1')
        while(!(await userStorage.userExists(id))) {
            console.log('Here2')
            id = tokenGenerator.generateToken()
        }

        console.log('Here3')

        await userStorage.storeUser(id, installTime)
        
        return {id, installTime}
    }
}