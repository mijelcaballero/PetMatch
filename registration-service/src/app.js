// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const registrationRoutes = require('./routes/registrationRoutes'); 

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api/register', registrationRoutes); // 

// Ruta de estado
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'registration-service' });
});

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;