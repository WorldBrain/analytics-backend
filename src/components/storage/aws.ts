import * as AWS from 'aws-sdk'
import { UserStorage, EventLogStorage } from './types'
import { S3 } from 'aws-sdk';
import { User } from '../../types/user'
import { EventLog } from '../../types/eventlog'
import * as fs from 'fs'
var stringify = require('csv-stringify');

const csv = require("fast-csv");


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

    async storeUser(id:string, install_time: number) {
        const key = 'users/users.csv'

        const users = await this._getObject({key, type: 'csv'})
        users.push([id, install_time])

        let body;

        await new Promise((resolve, reject) => {
            stringify(users, function(err, output){
                body = output;
                resolve(output)
            });
        })

        await this._putObject({key, body, type: 'csv'})
        return {id: "Hello"}
    }

    async isUserById(id) {
        const key = 'users/users.csv'
        const users = await this._getObject({key, type: 'csv'})

        users.forEach((user) => {
            if(user[0] == id) {
                return false;
            }
        })
        
        return true;
    }

    async _putObject({key, body, type, mime} : {key : string, body, type? : 'html' | 'csv' | 'buffer', mime? : string}) {
        const contentType = mime || {
            json: 'application/json',
            html: 'text/html',
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

        let users = [];

        await new Promise((resolve, reject) => {
              csv.fromStream(stream)
                .on('data', (e) => {
                    users.push(e);
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

    async storeEvents({eventlog}, {eventlog: EventLog}) {
        const key = 'events/events.csv'

        const events = await this._getObject({key, type: 'csv'})
        events.push(eventlog)

        let body;

        await new Promise((resolve, reject) => {
            stringify(events, function(err, output){
                body = output;
                resolve(output)
            });
        })

        await this._putObject({key, body, type: 'csv'})
    }

    async _putObject({key, body, type, mime} : {key : string, body, type? : 'html' | 'csv' | 'buffer', mime? : string}) {
        const contentType = mime || {
            json: 'application/json',
            html: 'text/html',
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

        let events = [];

        await new Promise((resolve, reject) => {
            csv.fromStream(stream)
            .on('data', (e) => {
                events.push(e);
            })
            .on('end', () => {
                resolve(events)
            })
        })
        
        
        return events
    }
}