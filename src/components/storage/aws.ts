import { UserStorage, EventLogStorage } from './types'
import { S3 } from 'aws-sdk';
import { User } from '../../types/user'
import { EventLog } from '../../types/eventlog'

export class AwsUserStorage implements UserStorage {
    async storeUser({user}, {user: User}) {
        return {id: "Hello"}
    }

    async getUserById(id) {
        return {
            id: "dummy",
            install_time: new Date()
        }
    }
}

export class AWSEventLogStorage implements EventLogStorage {
    async storeEvents({eventlog}, {eventlog: EventLog}) {
        
    }
}