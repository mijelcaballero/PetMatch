// src/config/db.js
const AWS = require('aws-sdk');
const config = require('./index');

// Configurar AWS
AWS.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region,
});

// Crear cliente de DynamoDB
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = {
  dynamoDb,
};