

const AWS = require('aws-sdk');
const config = require('./src/config');

// Configurar AWS
const awsConfig = {
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region
};

// Para desarrollo local, usar DynamoDB local
if (process.env.NODE_ENV === 'development' && process.env.USE_DYNAMODB_LOCAL === 'true') {
  awsConfig.endpoint = 'http://localhost:8000';
}

AWS.config.update(awsConfig);

// Cliente DynamoDB para operaciones de administración
const dynamoDB = new AWS.DynamoDB();

// Crear tabla de usuarios
async function createUsersTable() {
  const params = {
    TableName: config.dynamodb.tableUsers,
    KeySchema: [
      { AttributeName: 'userId', KeyType: 'HASH' } // Clave de partición (primary key)
    ],
    AttributeDefinitions: [
      { AttributeName: 'userId', AttributeType: 'S' },
      { AttributeName: 'email', AttributeType: 'S' }
    ],
    // Índice secundario global para buscar por email
    GlobalSecondaryIndexes: [
      {
        IndexName: 'EmailIndex',
        KeySchema: [
          { AttributeName: 'email', KeyType: 'HASH' }
        ],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  };

  try {
    const data = await dynamoDB.createTable(params).promise();
    console.log('Tabla de usuarios creada:', data);
    return data;
  } catch (err) {
    if (err.code === 'ResourceInUseException') {
      console.log('La tabla de usuarios ya existe');
    } else {
      console.error('Error al crear tabla de usuarios:', err);
      throw err;
    }
  }
}

// Ejecutar la creación de tablas
async function setupDynamoDB() {
  try {
    await createUsersTable();
    console.log('Configuración de DynamoDB completada');
  } catch (err) {
    console.error('Error durante la configuración de DynamoDB:', err);
  }
}

// Ejecutar el script
setupDynamoDB();