import { EventLog } from '../../types/eventlog'
import { User } from '../../types/user'
import { eventLog } from '../../express/routes/eventlog';

export interface UserStorage {
    storeUser(id: string, install_time: number): Promise<{id : string}>
    isUserById(id): Promise<boolean>
}

export interface EventLogStorage {
    storeEvents(events: any): Promise<void>
}