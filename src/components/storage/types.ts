import { EventLog } from '../../types/eventlog'
import { User } from '../../types/user'
import { eventLog } from '../../express/routes/eventlog';

export interface UserStorage {
    storeUser({user}, {user: User}): Promise<{id : string}>
    getUserById(id): Promise<User>
}

export interface EventLogStorage {
    storeEvents({eventlog}, {eventlog: EventLog}): Promise<void>
}