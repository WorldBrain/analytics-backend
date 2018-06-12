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
$ npm run config -- --account-id="12_DIGIT_ACCOUNT_ID" --bucket-name="UNIQUE_BUCKET_NAME" --function-name="LAMBDA _FUNCTION_NAME" --region="REGION" --stage="YOUR_STAGE_NAME" --stack-name="YOUR_AWS_STACK_NAME"
```

For example
```sh
$ npm run config -- --account-id="12_DIGIT_ACCOUNT_ID" --bucket-name="staging.analytics.worldbrain.io" --function-name="stagingAWSAnalytics" --stage="staging" --stack-name="StagingStack"
```
OR
```sh
$ npm run config -- --account-id="12_DIGIT_ACCOUNT_ID" --bucket-name="analytics.worldbrain.io" --function-name="AWSAnalytics" --stage="production" --stack-name="ProductionStack"
```

The default function name and region are
```sh
region: 'us-east-1',
function-name: 'AwsServerlessExpressFunction',
stack-name: 'AwsServerlessExpressStack'
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
  - other : Array of additional things - reserved for future

# Deploy
Deconfigure first by ruuning
```sh
npm run deconfig
```

Now config the file according to need

## Deploy in staging
```sh
$ npm run config -- --account-id="12_DIGIT_ACCOUNT_ID" --bucket-name="staging.analytics.worldbrain.io" --function-name="stagingAWSAnalytics" --stage="staging" --stack-name="StagingStack"
$ npm run setup
```

It will create the stack named as configure input.

## Deploy in production
```sh
npm run config -- --account-id="12_DIGIT_ACCOUNT_ID" --bucket-name="analytics.worldbrain.io" --function-name="AWSAnalytics" --stage="production" --stack-name="ProductionStack"
```

It will create the stack named as configure input.