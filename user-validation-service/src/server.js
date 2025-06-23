const app = require('./app');
const config = require('./config');

app.listen(config.port, () => {
  console.log(`User Validation service running on port ${config.port} in ${config.env} mode`);
});
