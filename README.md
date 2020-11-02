# Backend web infrastructure created with CDK TypeScript!

This will deploy:
- API Gateway
- DynamoDB table 'hitcounter' for tracking hits to each site the lambda function is executed from
- Lambda Function in python for updating the hits to DynamoDB
- Grants permission for lambda to write to dynamodb

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
