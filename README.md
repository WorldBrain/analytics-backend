# Serverless api endpoints using AWS lambda and AWS s3 for Analytics

This is the repository for the analytics of the memex - How the users intreacts with memex extension.

# Installation
Fork the repo
```sh
$ git clone https://github.com/WorldBrain/AnalyticsServer.git
```

Install all the dependencies
```sh
$ npm install
```

Install the [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/installing.html) and configure `aws configure`

Configure with AWS account
```sh
$ npm run  npm run config -- --account-id="12_DIGIT_ACCOUNT_ID" --bucket-name="UNIQUE_BUCKET_NAME" --function-name="LAMBDA _FUNCTION_NAME" --region="REGION"
```

The default function name and region are
```sh
region: 'us-east-1',
function-name: 'AwsServerlessExpressFunction'
```

Now you can deploy the serverless application to AWS

```sh
$ npm run prepare
$ npm run setup
```

Now we have two endpoints:
> /user-token/ - POST
- install_time: timestamp

> /event/ - POST
  - id: string
  - data: array of events

Each element of data contains:
  - type
  - time
  - data : Array of additional things - reserved for future
