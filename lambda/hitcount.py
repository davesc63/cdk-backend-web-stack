import json
import boto3

dynamodb = boto3.resource('dynamodb')
client = dynamodb.Table('hitcounter')
table = dynamodb.Table('hitcounter')

def lambda_handler(event, context):

    response = client.update_item(
        TableName='hitcounter',
        Key={
            'site': 'Dave Profile'
        },
        UpdateExpression='ADD hits :incr',
        ExpressionAttributeValues={':incr': 1}
    )
    response = table.get_item(
        Key={
            'site': 'Dave Profile'
        }
    )   
    count = response['Item']
   
    
    return{
      "statusCode": 200,
      'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      "body": json.dumps({"Visit_Count": str(count['hits']), "Site": str(count['site'])})
    }