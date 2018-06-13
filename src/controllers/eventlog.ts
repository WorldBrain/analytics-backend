import { AppComponents } from '../components'
import { TokenGenerator } from '../components/token-generator'
import { EventLogStorage } from '../components/storage/types'

export function eventLog(
    {eventLogStorage}:
    {eventLogStorage: EventLogStorage}
) {
    return async function handleEventlogPutRequest({event}) {
        await eventLogStorage.storeEvents(event)

        // Todo for other messages
        return {"success": true}
    }
}