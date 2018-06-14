import { UserStorage, EventLogStorage } from './types'
import { User } from '../../types/user'
import { EventLog } from '../../types/eventlog'

export class UserMemoryStorage implements UserStorage {
    public users = []

    async storeUser(id:string, installTime:number) {
        this.users.push([id, installTime])
        
        return {id, success: true}
    }

    async userExists(id) {
        this.users.forEach(user => {
          if(user[0] === id)
            return false
        })

        return true
    }
}

export class EventLogMemoryStorage implements EventLogStorage {
    public allEvents = []

    async storeEvents(events: any) {
        events.data.forEach((event) => {
            this.allEvents.push([event.time, events.id, event.other, event.type])
        })

        return true
    }
}