import * as AWS from 'aws-sdk'
import { UserStorage, EventLogStorage } from './types'
import { S3 } from 'aws-sdk'
import { User } from '../../types/user'
import { EventLog } from '../../types/eventlog'
import * as fs from 'fs'

export interface AwsStorageConfig {
    bucketName : string
    bucketRegion : string
  }

export class AwsUserStorage implements UserStorage {
    public _s3
    public bucketName : string

    constructor({bucketName} : {bucketName : string}) {
        AWS.config.update({region: process.env.AWS_REGION})
        this._s3 = new AWS.S3({apiVersion: '2006-03-01'})
        this.bucketName = bucketName
      }

    async storeUser(id:string, installTime: number) {
        const key = 'users/users.csv'

        const users = await this._getObject({key, type: 'csv'})
        users.push([id, installTime])


        const body = await new Promise((resolve, reject) => {
            require('csv-stringify')(users, function(err, output) {
                err? reject(err): resolve(output)
            })
        })

        await this._putObject({key, body, type: 'csv'})
        return {id: id}
    }

    async userExists(id) {
        const key = 'users/users.csv'
        const users = await this._getObject({key, type: 'csv'})

        users.forEach((user) => {
            if(user[0] === id) {
                return false
            }
        })
        
        return true
    }

    async _putObject({key, body, type, mime} : {key : string, body: any, type? : 'csv', mime? : string}) {
        const contentType = mime || {
            csv: 'text/csv',
            'image-png': 'image/png',
            'image-jpg': 'image/jpeg'
        }[type]

        const params = {
            ACL: 'public-read',
            Key: key,
            Body: body,
            Bucket: this.bucketName,
            ContentType: contentType
        }
    
        await new Promise((resolve, reject) => {
            this._s3.putObject(params, (err, data) => {
                err ? reject(err) : resolve()
            })
        })
    }

    async _getObject({key, type} : {key : string, type? : 'csv'}) {
        const params = {
            Bucket: this.bucketName,
            Key: key,
        }

        let stream = (await this._s3.getObject(params)).createReadStream()

        let users = []

        await new Promise((resolve, reject) => {
            require("fast-csv").fromStream(stream)
                .on('data', (e) => {
                    users.push(e)
                })
                .on('end', () => {
                    resolve(users)
                })
            })
        
        
        return users
    }
}

export class AwsEventLogStorage implements EventLogStorage {
    public _s3
    public bucketName : string

    constructor({bucketName} : {bucketName : string}) {
        AWS.config.update({region: process.env.AWS_REGION})
        this._s3 = new AWS.S3({apiVersion: '2006-03-01'})
        this.bucketName = bucketName
    }

    async storeEvents(events: any) {
        const key = 'events/events.csv'

        const allEvent = await this._getObject({key, type: 'csv'})

        events.data.forEach((event) => {
            allEvent.push([event.time, events.id, event.other, event.type])
        })

        const body = await new Promise((resolve, reject) => {
            require('csv-stringify')(allEvent, function(err, output) {
                resolve(output)
            })
        })

        await this._putObject({key, body, type: 'csv'})
    }

    async _putObject({key, body, type, mime} : {key : string, body: any, type? : 'csv', mime? : string}) {
        const contentType = mime || {
            csv: 'text/csv',
            'image-png': 'image/png',
            'image-jpg': 'image/jpeg'
        }[type]

        const params = {
            ACL: 'public-read',
            Key: key,
            Body: body,
            Bucket: this.bucketName,
            ContentType: contentType
        }
    
        await new Promise((resolve, reject) => {
            this._s3.putObject(params, (err, data) => {
                err ? reject(err) : resolve()
            })
        })
    }

    async _getObject({key, type} : {key : string, type? : 'csv'}) {
        const params = {
            Bucket: this.bucketName,
            Key: key,
        }

        let stream = (await this._s3.getObject(params)).createReadStream()

        let events = []

        await new Promise((resolve, reject) => {
            require("fast-csv").fromStream(stream)
            .on('data', (e) => {
                events.push(e)
            })
            .on('end', () => {
                resolve(events)
            })
        })
        
        
        return events
    }
}