import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';

export class CdkBackendWebStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
        const dynamoTable = new dynamodb.Table(this, 'hitcounter', {
          partitionKey: {
            name: 'site',
            type: dynamodb.AttributeType.STRING
          },
          tableName: 'hitcounter',
    
          // set the policy to DESTROY
          // cdk destroy will delete the table (even if it has data in it)
          removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
        });
    
        const hitcount = new lambda.Function(this, 'hitcountHandler', {
          code: lambda.Code.fromAsset('lambda'),
          handler: 'hitcount.lambda_handler',
          runtime: lambda.Runtime.PYTHON_3_8,
          description: "Function to update hitcounter in DynamoDB table"
        
        });
    
        dynamoTable.grantReadWriteData(hitcount);

        const api = new apigw.LambdaRestApi(this, 'hitApi', {
          handler: hitcount
        });

      }
    }
    
    export function addCorsOptions(apiResource: apigw.IResource) {
      apiResource.addMethod('OPTIONS', new apigw.MockIntegration({
        integrationResponses: [{
          statusCode: '200',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
            'method.response.header.Access-Control-Allow-Origin': "'*'",
            'method.response.header.Access-Control-Allow-Credentials': "'false'",
            'method.response.header.Access-Control-Allow-Methods': "'GET,PUT,POST'",
          },
        }],
        passthroughBehavior: apigw.PassthroughBehavior.NEVER,
        requestTemplates: {
          "application/json": "{\"statusCode\": 200}"
        },
      }), {
        methodResponses: [{
          statusCode: '200',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Headers': true,
            'method.response.header.Access-Control-Allow-Methods': true,
            'method.response.header.Access-Control-Allow-Credentials': true,
            'method.response.header.Access-Control-Allow-Origin': true,
          },  
        }]
      })
    }