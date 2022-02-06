const express = require('express');
const {
  sayHello,
  firstCharacters,
  uppercase,
  lowercase,
  firstCharacter,
} = require('./lib/strings');

const app = express();

app.get('/strings/hello/world', (req, res) => {
  res.status(200).json({ result: 'Hello, world!' });
});

app.get('/strings/hello/:str', (req, res) => {
  res.status(200).json({ result: sayHello(req.params.str) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.json({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.json({ result: lowercase(req.params.string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  const { string } = req.params;
  res.status(200).json({ result: firstCharacter(string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  const { string } = req.params;
  const { query } = parseInt(req.query);
  res.status(200).json({ result: firstCharacters(string, query) });
});

module.exports = app;
