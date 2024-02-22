const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_WEATHER_TABLE;

module.exports.handler = async (event) => {
  const weather = JSON.parse(event["body"]).weather;
  const town = JSON.parse(event["body"]).town;
  const ctry = JSON.parse(event["body"]).country;
  const temp = JSON.parse(event["body"]).temperature;

  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: event.pathParameters.id,
    },
    UpdateExpression: "set weather = :weather",
    ExpressionAttributeValues: {
      ":weather": weather,
      ":town": town,
      ":country": ctry,
      ":temperature": temp,
    },
    ReturnValues: "UPDATED_NEW",
  };
  try {
    const data = await docClient.update(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({message:"Item updated successfully"}),
    };
  } catch (err) {
    console.log(err);
  }
};
