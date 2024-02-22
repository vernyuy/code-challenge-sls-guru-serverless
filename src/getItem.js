const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid");
const TABLE_NAME = process.env.TABLE_NAME;

module.exports.handler = async (event) => {
  //   Get item by id from dynamodb table
  const { id } = event.pathParameters;

  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: id,
    },
  };

  await docClient.get(params).promise();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Item deleted successfully",
    }),
  };
};
