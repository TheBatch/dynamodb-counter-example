const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

docClient.update({
  "TableName": "counters",
  "ReturnValues": "UPDATED_NEW",
  "ExpressionAttributeValues": {
    ":a": 1
  },
  "ExpressionAttributeNames": {
    "#v": "currentValue"
  },
  "UpdateExpression": "SET #v = #v + :a",
  "Key": {
    "counterName": "importantCounter"
  }
}, function (err, data) {
  if (err) console.log(err);
  else console.log(data);
});