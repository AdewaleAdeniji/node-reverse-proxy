var config = require("./config");
const express = require('express');
const https = require('https');

const app = express();

app.get('/ip', (req, res) => {
  https.get('https://ipecho.net/plain', (response) => {
    let realIP = '';
    response.on('data', (chunk) => {
      realIP += chunk;
    });
    response.on('end', () => {
      res.send(realIP);
    });
  }).on('error', (error) => {
    console.error(error);
    res.status(500).send('Unable to retrieve IP address');
  });
});

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
