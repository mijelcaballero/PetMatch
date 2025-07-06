const express = require('express');
const bodyParser = require('body-parser');
const imageRoutes = require('./routes/imageRoutes');
const app = express();

app.use(bodyParser.json());
app.use('/api', imageRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'image-service' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
