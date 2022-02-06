import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB({ region: "eu-west-1" });

const genTables = async () => {
  const params = {
    TableName: "pastes",
    KeySchema: [
      { AttributeName: "date", KeyType: "HASH" }, // Partition key
      { AttributeName: "title", KeyType: "RANGE" }, // Sort key
    ],
    AttributeDefinitions: [
      { AttributeName: "date", AttributeType: "S" },
      { AttributeName: "title", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  };
  return dynamodb
    .createTable(params)
    .promise()
    .then((data: AWS.DynamoDB.CreateTableOutput) =>
      console.log(
        "Created table. Table description JSON:",
        JSON.stringify(data, null, 2)
      )
    )
    .catch((err: AWS.AWSError) => {
      console.error(
        "Unable to create table. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    });
};

genTables();
