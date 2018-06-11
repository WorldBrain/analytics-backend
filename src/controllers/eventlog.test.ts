import { expect } from 'chai';
import { TokenGenerator } from '../components/token-generator'
import * as controllers from './eventlog'
import { AwsEventLogStorage, EventLogStorage, EventLogMemoryStorage } from '../components/storage'

describe('Save events in memory', () => {
    it('ave events in memory', async () => {
        const dummyEvent = {
            "id": "a6141946-5f67-4e21-a27a-ad97543ae0a9",
            "data": [
                {
                    "type": "bookmark",
                    "time": 1528692542998,
                    "other": []
                },
                {
                    "type": "tagging",
                    "time": 1528693542998,
                    "other": []
                }
            ]
        }

        const controller = controllers.eventLog({
            AwsEventLogStorage: new EventLogMemoryStorage()
        })

        await controller({event: dummyEvent})
    })
})