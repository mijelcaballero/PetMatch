const app = require('./app');
const { port } = require('./config');

app.listen(port, () => {
  console.log(`geocoding-service listening on port ${port}`);
});
