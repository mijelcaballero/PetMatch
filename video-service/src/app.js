const express = require('express');
const bodyParser = require('body-parser');
const videoRoutes = require('./routes/videoRoutes');
const app = express();

app.use(bodyParser.json());
app.use('/api', videoRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'video-service' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
