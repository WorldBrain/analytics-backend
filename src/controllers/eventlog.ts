import { AppComponents } from '../components'
import { TokenGenerator } from '../components/token-generator'
import { EventLogStorage } from '../components/storage/types'

export function eventLog(
    {eventLogStorage}:
    {eventLogStorage: EventLogStorage}
) {
    return async function handleEventlogPutRequest({event}) {
        let eventsStatus

        try {
            eventsStatus = await eventLogStorage.storeEvents(event)
        } catch(err) {
            return {
                "success": false,
                "message": err,
            }
        }

        return {"success": eventsStatus}
    }
}