import { expect } from 'chai';
import { TokenGenerator } from './token-generator'

describe('UserTokenGenerator', () => {
    it('should correctly generate the user token', async () => {
        const idGenerator = new TokenGenerator()
        const id = idGenerator.generateToken()

        expect(typeof(id)).to.equal("string")
        expect(id.length).to.equal(36)
    })
})