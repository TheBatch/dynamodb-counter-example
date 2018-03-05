const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

docClient.get({
  "TableName": "counters",
  "Key": {
    "counterName": "importantCounter"
  },
  "ConsistentRead": true
}, function (err, data) {
  if (err) console.log(err);
  else {
    const currentValue = data.Item.currentValue;
    const newValue = currentValue + 1;
    docClient.update({
      "TableName": "counters",
      "ReturnValues": "UPDATED_NEW",
      "ExpressionAttributeValues": {
        ":a": currentValue,
        ":bb": newValue
      },
      "ExpressionAttributeNames": {
        "#currentValue": "currentValue"
      },
      "ConditionExpression": "(#currentValue = :a)",
      "UpdateExpression": "SET #currentValue = :bb",
      "Key": {
        "counterName": "importantCounter"
      }
    }, function (err, data) {
      if (err) console.log(err);
      else console.log(data);
    })
  }
});
