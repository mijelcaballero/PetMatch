const app = require('./app');
const config = require('./config');

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Authorization service running on port ${PORT} in ${config.env} mode`);
});
