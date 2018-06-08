import { UserStorage, EventLogStorage } from './types'
import { User } from '../../types/user'
import { EventLog } from '../../types/eventlog'

export class UserMemoryStorage implements UserStorage {
    public users = {}

    async storeUser({user}, {user: User}) {
        return {
            id: "Hello"
        }
    }

    async getUserById(id) {
        return {
            id: "dummy",
            install_time: new Date()
        }
    }
}

export class EventLogMemoryStorage implements EventLogStorage {
    async storeEvents({eventlog}, {eventlog: EventLog}) {
        
    }
}