// src/models/user.js
const { v4: uuidv4 } = require('uuid');
const { dynamoDb } = require('../config/db');
const config = require('../config');

class User {
  constructor(data) {
    this.userId    = data.userId    || uuidv4();
    this.email     = data.email;
    this.password  = data.password;   // Password Hasheada
    this.name      = data.name;
    this.role      = data.role       || 'user';
    this.createdAt = data.createdAt  || new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  static async findByEmail(email) {
    const params = {
      TableName:      config.dynamodb.tableUsers,
      IndexName:      'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email },
    };
    const result = await dynamoDb.query(params).promise();
    return result.Items[0] || null;
  }

  static async findById(userId) {
    const params = {
      TableName: config.dynamodb.tableUsers,
      Key:       { userId },
    };
    const result = await dynamoDb.get(params).promise();
    return result.Item || null;
  }

  async save() {
    const params = {
      TableName: config.dynamodb.tableUsers,
      Item: {
        userId:    this.userId,
        email:     this.email,
        password:  this.password,   // ya viene hashed
        name:      this.name,
        role:      this.role,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      },
      ConditionExpression: 'attribute_not_exists(userId)',
    };
    await dynamoDb.put(params).promise();
    return this;
  }
}

module.exports = User;
