const express = require('express');
const { sayHello } = require('./lib/strings');

const app = express();

app.get('/strings/hello/world', (req, res) => {
  res.status(200).json({ result: 'Hello, world!' });
});

app.get('/strings/hello/:str', (req, res) => {
  res.status(200).json({ result: sayHello(req.params.str) });
});

module.exports = app;
