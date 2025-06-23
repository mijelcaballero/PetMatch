const AWS = require('aws-sdk');
const config = require('./index');

// Solo región: las credenciales las toma del Instance Profile
AWS.config.update({ region: config.aws.region });

const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports = { dynamoDb };
// Exportamos el cliente de DynamoDB para que pueda ser utilizado en otros módulos
// y así evitar la creación de múltiples instancias del cliente en la aplicación. 