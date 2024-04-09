const app = require('./app');

// 4) Start the Server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
