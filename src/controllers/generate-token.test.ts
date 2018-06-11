import { expect } from 'chai';
import { TokenGenerator } from '../components/token-generator'
import * as controllers from './generate-token'
import { AwsUserStorage, UserStorage, UserMemoryStorage } from '../components/storage'

describe('User token generate and save in memory', () => {
    it('Generate and save the user token in memory', async () => {
        const dummyUser = {
            "id": 'newtoken-user-user-user-testtesttest',
            install_time: 1528692542998
        }

        const controller = controllers.generateToken({
            tokenGenerator: new TokenGenerator(),
            AwsUserStorage: new UserMemoryStorage()
        })

        const result = await controller({installTime: dummyUser.install_time})

        expect(result.installTime).to.be.equal(dummyUser.install_time)
    })
})