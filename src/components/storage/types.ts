import { EventLog } from '../../types/eventlog'
import { User } from '../../types/user'
import { eventLog } from '../../express/routes/eventlog';

export interface UserStorage {
    storeUser(id: string, installTime: number): Promise<{id : string}>
    userExists(id): Promise<boolean>
}

export interface EventLogStorage {
    storeEvents(events: any): Promise<boolean>
}