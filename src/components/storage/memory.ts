import { UserStorage, EventLogStorage } from './types'
import { User } from '../../types/user'
import { EventLog } from '../../types/eventlog'

export class UserMemoryStorage implements UserStorage {
    public users = {}

    async storeUser(id:string, install_time:number) {
        return {
            id: "Hello"
        }
    }

    async isUserById(id) {
        return false
    }
}

export class EventLogMemoryStorage implements EventLogStorage {
    async storeEvents(events: any) {
        
    }
}