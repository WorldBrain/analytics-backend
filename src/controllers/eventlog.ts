import { AppComponents } from '../components'
import { TokenGenerator } from '../components/token-generator'
import { EventLogStorage } from '../components/storage/types'

export function eventLog(
    {eventLogStorage}:
    {eventLogStorage: EventLogStorage}
) {
    return async function handleEventlogPutRequest({event}) {
        const eventsStatus = await eventLogStorage.storeEvents(event)

        return {"success": eventsStatus}
    }
}