const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_WEATHER_TABLE;

module.exports.handler = async (event) => {
    const params = {
        TableName: TABLE_NAME,
    }
  try{
    const data = await docClient.scan(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.Items),
    };
  }catch(err){
    console.log(err);
  }
};
