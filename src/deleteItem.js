const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_WEATHER_TABLE;

module.exports.handler = async (event) => {
  //   Get item by id from dynamodb table
  const { id } = event.pathParameters;

  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: id,
    },
  };

 try{
    const data = await docClient.delete(params).promise();
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
 }catch(err){
    console.log(err);
 }
};
