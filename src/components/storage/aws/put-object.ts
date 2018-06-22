interface PutObjectProps {
    s3: any,
    bucketName: string,
    key: string
    body: any,
    type?: 'json'   // For now we are storing only json files in the s3 bucket
    mime?: string
}

export default async function _putObject({s3, bucketName,  key, body, type, mime} : PutObjectProps) {
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
        Bucket: bucketName,
        ContentType: contentType
    }

    return s3.putObject(params).promise()
      .then(() => Promise.resolve(true))
      .catch(function (err) {
          return Promise.reject(err)
      })
  }