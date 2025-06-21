// src/models/user.js
const { v4: uuidv4 } = require('uuid');
const { dynamoDb } = require('../config/db');
const config = require('../config');
const bcrypt = require('bcrypt');

class User {

  constructor(data) {
    this.userId = data.userId || uuidv4();
    this.email = data.email;
    this.password = data.password; // Debe estar hasheado antes de almacenarlo
    this.name = data.name;
    this.role = data.role || 'user';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  // Buscar usuario por email
  static async findByEmail(email) {

    const params = {
      TableName: config.dynamodb.tableUsers,
      IndexName: 'EmailIndex', // Índice secundario global para buscar por email
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    };

    try {
      const result = await dynamoDb.query(params).promise();
      return result.Items.length > 0 ? result.Items[0] : null;
    } catch (error) {
      console.error('Error al buscar usuario por email:', error);
      throw error;
    }
  }

  // Buscar usuario por ID
  static async findById(userId) {

    const params = {
      TableName: config.dynamodb.tableUsers,
      Key: {
        userId,
      },
    };

    try {
      const result = await dynamoDb.get(params).promise();
      return result.Item || null;
    } catch (error) {
      console.error('Error al buscar usuario por ID:', error);
      throw error;
    }
  }

  // Guardar un nuevo usuario
  async save() {
    
    // Hashear la contraseña antes de guardarla
    this.password = await bcrypt.hash(this.password, 10);

    const params = {
      TableName: config.dynamodb.tableUsers,
      Item: {
        userId: this.userId,
        email: this.email,
        password: this.password,
        name: this.name,
        role: this.role,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      },
      ConditionExpression: 'attribute_not_exists(userId)',
    };

    try {
      await dynamoDb.put(params).promise();
      return this;
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      throw error;
    }
  }

  // Verificar contraseña
  static async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;