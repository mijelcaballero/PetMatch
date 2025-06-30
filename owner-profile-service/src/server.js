// src/server.js
const app = require('./app');
const { port, env } = require('./config');

app.listen(port,()=>console.log(`Owner-service running on ${port} (${env})`));
