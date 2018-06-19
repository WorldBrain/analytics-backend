import * as fs from 'fs'
import * as path from 'path'
import { UserStorage, EventLogStorage } from './types'
import { mkdirSyncIfNotExists } from '../../utils/fs'

export class UserDiskStorage implements UserStorage {
    public basePath : string

    constructor({basePath} : {basePath : string}) {
        this.basePath = basePath
    }

    async storeUser(id: string, installTime: number) {
        // If the user is first user, make public directory
        mkdirSyncIfNotExists(this.basePath)
        
        // Make directory public/users
        mkdirSyncIfNotExists(this.basePath + '/users')

        const body = {
            "id": id,
            "installTime": installTime
        }

        fs.writeFileSync(path.join(this.basePath, 'users', id + '.json'), JSON.stringify(body))
        
        return {"id": id, success: true}
    }

    async userExists(id) {
        const isUserDirExists = this._isDirExists('/users')

        if(!isUserDirExists) {
            return false
        }

        const filePath = path.join(this.basePath, 'users', id + '.json')

        return fs.existsSync(filePath)
    }

    _isDirExists(url:string) {
        const dirPath = this.basePath + url
        return fs.existsSync(dirPath)
    }
}

export class EventDiskStorage implements EventLogStorage {
    public basePath : string

    constructor({basePath} : {basePath : string}) {
        this.basePath = basePath
    }

    async storeEvents(events: any) {
        // If the user is first user, make public directory
        mkdirSyncIfNotExists(this.basePath)
        
        // Create directory: public/events
        mkdirSyncIfNotExists(this.basePath + '/events')

        let storeEventSuccess = true

        for(let event of events.data) {
            const body = {
                time: event.time,
                id: events.id,
                other: event.other,
                type: event.type
            }

            const eventId = event.time + '-' + event.type

            mkdirSyncIfNotExists(this.basePath + '/events/' + String(events.id))

            const key = path.join(this.basePath, 'events',String(events.id), eventId + '.json')
            fs.writeFileSync(key, JSON.stringify(body))
        }

        return storeEventSuccess
    }
}