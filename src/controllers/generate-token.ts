import { AppComponents } from '../components'
import { TokenGenerator } from '../components/token-generator'

export function generateToken(
    {tokenGenerator}:
    {tokenGenerator: TokenGenerator}
) {
    return async function handleGenerateTokenRequest() {
        const id = tokenGenerator.generateToken()
        return {id}
    }
}