// Build a lambda function to insert an Item into dynamodb table
import { DynamoDB } from 'aws-sdk';
const docClient = new DynamoDB.DocumentClient();
import { v4 } from 'uuid';
const TABLE_NAME = process.env.TABLE_NAME;


export async function handler(event) {
  console.log(event);
  const data = JSON.parse(event.body);
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: v4(),
      ...data
    }
  };

  await docClient.put(params).promise();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Item inserted successfully'
    })
  };
}
