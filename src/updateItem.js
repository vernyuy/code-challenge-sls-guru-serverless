const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_WEATHER_TABLE;

module.exports.handler = async (event) => {
  // update item in dynamodb

  const params = {
    TableName: TABLE_NAME,
    Key: {
        id: event.pathParameters.id,
    },
    UpdateExpression: "set weather = :weather",
    ExpressionAttributeValues: {
        ":weather": event.body
    },
    ReturnValues: "UPDATED_NEW",
}
  try{
    const data = await docClient.update(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.Item),
    };
  }catch(err){
    console.log(err);
  }
};
