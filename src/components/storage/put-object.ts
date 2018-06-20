import * as AWS from 'aws-sdk'

interface PutObjectProps {
    key: string
    body: any,
    type?: 'json'   // For now we are storing only json files in the s3 bucket
    mime?: string
}

export default class putObject {
    private __s3
    private _bucketName : string

    constructor({bucketName} : {bucketName : string}) {
        AWS.config.update({region: process.env.AWS_REGION})
        this.__s3 = new AWS.S3({apiVersion: '2006-03-01'})
        this._bucketName = bucketName
    }

    protected async _putObject({key, body, type, mime} : PutObjectProps) {
        if (type === 'json') {
            body = JSON.stringify(body)
        }
    
        const contentType = mime || {
            json: 'application/json',
        }[type]
    
        const params = {
            ACL: 'public-read',
            Key: key,
            Body: body,
            Bucket: this._bucketName,
            ContentType: contentType
        }
    
        await new Promise((resolve, reject) => {
            this.__s3.putObject(params, (err, data) => {
                err ? reject(err) : resolve()
            })
        })
    
        return true
    }
}