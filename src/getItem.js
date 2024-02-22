const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_WEATHER_TABLE;

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: id,
    },
  };
  try {
    const data = await docClient.get(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.Item),
    };
  } catch (err) {
    console.log(err);
  }
};
