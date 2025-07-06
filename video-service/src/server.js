const app = require('./app');
const { port } = require('./config/index');

app.listen(port, () => {
  console.log(`video-service listening on port ${port}`);
});
