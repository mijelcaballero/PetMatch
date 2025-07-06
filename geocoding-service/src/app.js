const express = require('express');
const geocodeRoutes = require('./routes/geocodeRoutes');
const app = express();

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'geocoding-service' });
});

// Routes
app.use('/api', geocodeRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
