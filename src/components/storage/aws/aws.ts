import * as AWS from 'aws-sdk'
import { UserStorage, EventLogStorage } from '../types'
import { S3 } from 'aws-sdk'
import { User } from '../../../types/user'
import { EventLog } from '../../../types/eventlog'
import * as fs from 'fs'
import putObject from './put-object'

export interface AwsStorageConfig {
    bucketName : string
    bucketRegion : string
}

interface PutObjectProps {
    key: string
    body: any,
    type?: 'json'   // For now we are storing only json files in the s3 bucket
    mime?: string
}

export class AwsUserStorage implements UserStorage {
    private _s3
    private bucketName : string
    private dir : string
    private ext : string
    private contentType : any

    static DEF_DIR = 'users/'
    static DEF_EXT = '.json'
    static DEF_CONTENT_TYPE = {json: 'application/json'}

    constructor({bucketName, dir = AwsUserStorage.DEF_DIR, ext = AwsUserStorage.DEF_EXT, contentType = AwsUserStorage.DEF_CONTENT_TYPE} : {bucketName : string, dir?: string, ext?: string, contentType?: any}) {
        AWS.config.update({region: process.env.AWS_REGION})
        this._s3 = new AWS.S3({apiVersion: '2006-03-01'})
        this.bucketName = bucketName
        this.dir = dir
        this.ext = ext
        this.contentType = contentType
    }

    async storeUser(id:string, installTime: number) {
        const key = this.dir + id + this.ext
        const body = { id, installTime }

        const success = await putObject({s3: this._s3, bucketName: this.bucketName, key, body, type: 'json'})
        return {id, success}
    }

    async userExists(id) {
        const key = this.dir + id + this.ext
        const isUserExists = _isUserExists(this._s3, this.bucketName, key);
        return isUserExists    
    }
}

function _isUserExists(s3, bucket, key) {
    return s3.headObject({Bucket: bucket, Key: key}).promise()
      .then(() => Promise.resolve(true))
      .catch(function (err) {
        if (err.code == 'NotFound' || err.code == 'Forbidden') {
          return Promise.resolve(false)
        } else {
          return Promise.reject(err)
        }
      })
  }
  

export class AwsEventLogStorage implements EventLogStorage {
    private _s3
    private bucketName : string
    private dir : string
    private ext : string
    private contentType : any

    static DEF_DIR = 'events/'
    static DEF_EXT = '.json'
    static DEF_CONTENT_TYPE = {json: 'application/json'}

    constructor({bucketName, dir = AwsEventLogStorage.DEF_DIR, ext = AwsEventLogStorage.DEF_EXT, contentType = AwsEventLogStorage.DEF_CONTENT_TYPE} : {bucketName : string, dir?: string, ext?: string, contentType?: any}) {
        AWS.config.update({region: process.env.AWS_REGION})
        this._s3 = new AWS.S3({apiVersion: '2006-03-01'})
        this.bucketName = bucketName
        this.dir = dir
        this.ext = ext
        this.contentType = contentType
    }

    async storeEvents(events: any) {
        const key = 'users/' + events.id + this.ext
        // const isUserExists = await _isUserExists(this._s3, this.bucketName, key)

        // if(!isUserExists) {
        //     throw new Error('Fraud user')
        // }

        let storeEventSuccess = true

        for(const event of events.data) {
            const body = {
                time: event.time,
                id: events.id,
                details: event.details,
                type: event.type
            }

            const eventId = event.time + '-' + event.type

            const key = this.dir + events.id + '/' + eventId + this.ext
            storeEventSuccess = storeEventSuccess && await putObject({s3: this._s3, bucketName: this.bucketName, key, body, type: 'json'})
        }

        return storeEventSuccess
    }
}