# Serverless framework CRUDL API.

This project is a CRUDL api that inserts and retrieves data from AWS Dynamodb. The system is built using `serverless framework` as the IaC framework, `Node Js` as the technology and `Javascript` as the programming language.

- C: Create
- R: Read
- U: Update
- D: Delete
- L: List

## Installation

To run this project, clone the repository, open it in your favourite IDE (vs-code for its simplicity). open the terminal in the root directory of your project and run `npm install` to install the required dependencies.

At this point, you can choose either to push to github for your CICD or to directly deploy to your AWS account using `sls deploy --stage {stageName}`

## AWS Services Used

- `ApiGateway`
- `Lambda fnctions`
- `Dynmodb`

## The project's stack

The `serverless.yml` file found at the root directory of the project is used to define and provission AWS services needed this project.

The stack contains 5 lambda functions that are invoked by api gateway event with different http methods and routes.

The stack also defines a dynamodb table resource where data is being persisted.

## How it works

The system consist of 5 lambda functions that can also be called `lambda proxy` where each is responsible to perform a specific `http method`.

**Http Methods incloud:**

- GET
- POST
- PUT
- DELETE

### 1. **CreateItem Lambda:**

The `createItem` lambda function is invoked by an api gateway event with http method **POST** and the request payload contains the required data needed to be stored in the dynamodb table.

The lambda picks the the item data from the request body, generates a unique key for that item and inserts the final data into the dynamodb table.

**Sample Request**

httpMethod POST

request url: https://randdomKey.execute-api.region.amazonaws.com/dev/

request body:

```json
{
  "country": "Cameroon",
  "town": "Douala",
  "weather": "Rainy",
  "temperature": "21 deg"
}
```

response

```json
{
  "statusCode": 200,
  "message": "Item inserted successfully"
}
```

### 2. **GetItem Lambda:**

The `GetItem` lambda function is invoked by an api gateway event with http method **GET** and the request payload contains the required data needed to be stored in the dynamodb table.

The lambda picks the item's key is provided by the user as a `pathParameter`. The lambda function extracts the item's key from the `pathParameter` and issue a get item request from the dynamodb table.

**Sample Request**  

httpMethod GET

request url: https://randdomKey.execute-api.region.amazonaws.com/dev/{item's key}

response

```json
{
  "item": {
    "id": "ef2167de-d5ca-4d95-87cf-f776af09eeb3",
    "temperature": "21 deg",
    "country": "Cameroon",
    "weather": "Rainy",
    "town": "Douala"
  }
}
```

### 3. **DeleteItem Lambda:**

The `DeleteItem` lambda function is invoked by an api gateway event with http method **DELETE** and the request payload contains the required data needed to remove an item from the dynamodb table.

The user provides the item's key as a `pathParameter`. The lambda function extracts the item's key from the `pathParameter` and issue a delete item request from the dynamodb table.

**Sample Request**

httpMethod: **DELETE**

request url: https://randdomKey.execute-api.region.amazonaws.com/dev/{item's key}

response

```json
{
  "message": "Item deleted successfully"
}
```

### 4. **UpdateItem Lambda:**

The `UpdateItem` lambda function is invoked by an api gateway event with http method **PUT** and the request payload contains the required data needed to remove an item from the dynamodb table.

The user provides the item's key as a `pathParameter` and provides the items attributes with their values in the request body. The lambda function extracts the item's key from the `pathParameter`, the items data from the request body and issue an update item request to the dynamodb table.

**Sample Request**

httpMethod: **PUT**

request url: https://randdomKey.execute-api.region.amazonaws.com/dev/{item's key}

**Request body:**

```json
{
  "temperature": "<new value>",
  "country": "<new value>",
  "weather": "<new value>",
  "town": "Cape Town"
}
```

Feel free to change the values of any attribute.

**Response**

```json
{
  "message": "Item updated successfully"
}
```

### 5. **ListItems Lambda:**

The `ListItems` lambda function is invoked by an api gateway event with http method **GET** and it retrieves all the items found in the dynamodb table provided the limit size of the **1mb** is not exceeded using the **scan** method

**Sample Request**

httpMethod: **GET**

request url: https://randdomKey.execute-api.region.amazonaws.com/dev/


Feel free to change the values of any attribute.

**Response**

```json
{
    "items": [
        {
            "id": "dd166e7a-64fa-44be-90d9-1e8d549a4bc9",
            "temperature": "21 deg",
            "country": "Cameroon",
            "weather": "Sunny",
            "town": "Douala"
        },
        {
            "id": "ef2167de-d5ca-4d95-87cf-f776af09eeb3",
            "temperature": "21 deg",
            "country": "Cameroon",
            "weather": "Rainy",
            "town": "Buea"
        }
    ]
}
```