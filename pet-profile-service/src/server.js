// src/server.js
const app = require('./app');
const { port, env } = require('./config');
app.listen(port,()=>console.log(`Pet-service on ${port} (${env})`));
