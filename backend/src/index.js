const express = require('express');
const os = require('os');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.end(`Responsed from ${os.hostname()}\n`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
