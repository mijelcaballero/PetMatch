const { dynamoDb } = require('../config/db');
const config = require('../config');

class User {
    
  /** Busca un usuario por ID */
  static async findById(userId) {
    const params = { TableName: config.dynamodb.tableUsers, Key: { userId } };
    const result = await dynamoDb.get(params).promise();
    return result.Item || null;
  }

    /** Busca un usuario por email */
  static async findByEmail(email) {
    const params = {
      TableName: config.dynamodb.tableUsers,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email },
    };
    const result = await dynamoDb.query(params).promise();
    return result.Items[0] || null;
  }

  /** Busca un usuario por nombre */
  static async findByName(name) {
    // IndexName con GSI generado en DynamoDB
    const params = {
      TableName: config.dynamodb.tableUsers,
      IndexName: 'NameIndex',                      // GSI en DynamoDB
      KeyConditionExpression: 'name = :name',
      ExpressionAttributeValues: { ':name': name },
    };
    const result = await dynamoDb.query(params).promise();
    return result.Items[0] || null;
  }

}

module.exports = User;
