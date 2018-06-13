import { expect } from 'chai';
import { TokenGenerator } from '../components/token-generator'
import * as controllers from './generate-token'
import { AwsUserStorage, UserStorage, UserMemoryStorage } from '../components/storage'

describe('User token generate and save in memory', () => {
    it('Generate and save the user token in memory', async () => {
        const dummyUser = {
            "id": 'newtoken-user-user-user-testtesttest',
            installTime: 1528692542998
        }

        const controller = controllers.generateToken({
            TokenGenerator: new TokenGenerator(),
            AwsUserStorage: new UserMemoryStorage()
        })

        const result = await controller({installTime: dummyUser.installTime})

        expect(result.installTime).to.be.equal(dummyUser.installTime)
    })
})