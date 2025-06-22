// src/server.js
const app = require('./app');
const config = require('./config');

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Servidor auth-service ejecutándose en el puerto ${PORT}`);
  console.log(`Entorno: ${config.env}`);
});