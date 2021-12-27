const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hey dockerized app!');
});

app.listen(3000, () => {
  console.log('Dockerized app is up...');
});
