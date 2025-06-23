const { v4: uuidv4 } = require('uuid');
const { dynamoDb } = require('../config/db');
const config = require('../config');

class Role {
  constructor(data) {
    this.roleId = data.roleId || uuidv4();
    this.name = data.name;
    this.permissions = data.permissions || [];
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  static async findByName(name) {
    const params = {
      TableName: config.dynamodb.tableRoles,
      KeyConditionExpression: 'name = :n',
      ExpressionAttributeValues: { ':n': name },
    };
    const res = await dynamoDb.query(params).promise();
    return res.Items[0] || null;
  }

  async save() {
    const params = {
      TableName: config.dynamodb.tableRoles,
      Item: {
        roleId: this.roleId,
        name: this.name,
        permissions: this.permissions,
        createdAt: this.createdAt,
      },
      ConditionExpression: 'attribute_not_exists(roleId)',
    };
    await dynamoDb.put(params).promise();
    return this;
  }
}

module.exports = Role;
