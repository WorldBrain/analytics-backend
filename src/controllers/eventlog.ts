import { AppComponents } from '../components'
import { TokenGenerator } from '../components/token-generator'
import { EventLogStorage } from '../components/storage/types'

export function eventLog(
    {AwsEventLogStorage}:
    {AwsEventLogStorage: EventLogStorage}
) {
    return async function handleEventlogPutRequest({event}) {
        await AwsEventLogStorage.storeEvents(event)

        return {"success": true}
    }
}