'use strict'
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');
const TABLE_NAME = process.env.DYNAMODB_WEATHER_TABLE;


module.exports.handler = async (event) => {
  console.log(event);
  const data = JSON.parse(event.body);
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: uuid.v4(),
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
};
