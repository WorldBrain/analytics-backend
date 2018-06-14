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
        const key = 'users/' + id + '.json'
        const body = {"id":id,"installTime":installTime}

        const success = await this._putObject({key, body, type: 'json'})
        return {id, success}
    }

    async userExists(id) {
        const key = 'users/' + id + '.json'
        return await this._getObject({key, type: 'json'})        
    }

    async _putObject({key, body, type, mime} : {key : string, body: any, type? : 'json', mime? : string}) {
        if (type === 'json') {
            body = JSON.stringify(body)
        }

        const contentType = mime || {
            json: 'text/json',
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

        try {
            const headCode = this._s3.putObject(params).promise()
        } catch(headErr) {
            return false
        }

        return true
    }

    async _getObject({key, type} : {key : string, type? : 'json'}) {
        const params = {
            Bucket: this.bucketName,
            Key: key,
        }
        
        try {
            const headCode = await this._s3.headObject(params).promise()
        } catch(headErr) {
            if(headErr.code === 'NotFound') {
                return false
            }
            console.log(headErr.code)
        }
        
        return true
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
        let storeEventSuccess = true

        for(let event of events.data) {
            const body = {
                time: event.time,
                id: events.id,
                other: event.other,
                type: event.type
            }

            const eventId = event.time + event.type

            const key = 'events/' + events.id + '/' + eventId + '.json'
            storeEventSuccess = storeEventSuccess && await this._putObject({key, body, type: 'json'})
        }

        return storeEventSuccess
    }

    async _putObject({key, body, type, mime} : {key : string, body: any, type? : 'json', mime? : string}) {
        if (type === 'json') {
            body = JSON.stringify(body)
        }

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

        try {
            const headCode = this._s3.putObject(params).promise()
        } catch(headErr) {
            return false
        }

        return true
    }
}