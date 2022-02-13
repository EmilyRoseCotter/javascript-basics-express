const express = require('express');
const res = require('express/lib/response');
const {
  sayHello,
  firstCharacters,
  uppercase,
  lowercase,
  firstCharacter,
} = require('./lib/strings');

const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');

const { negate, truthiness, isOdd, startsWith } = require('./lib/booleans');

const {
  getNthElement,
  arrayToCSVString,
  addToArray2,
  elementsStartingWithAVowel,
  removeNthElement2,
} = require('./lib/arrays');

const app = express();

app.use(express.json());

// STRINGS

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

app.get('/strings/first-character/:string', (req, res) => {
  const { string } = req.params;
  res.status(200).json({ result: firstCharacter(string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  const { string } = req.params;
  const { length } = req.query;
  res.status(200).json({ result: firstCharacters(string, length) });
});

// NUMBERS

app.get('/numbers/add/:num1/and/:num2', (req, res) => {
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);

  if (Number.isNaN(num1) || Number.isNaN(num2) === NaN) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200).json({ result: add(num1, num2) });
  }
});

app.get('/numbers/subtract/:num1/from/:num2', (req, res) => {
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);

  if (Number.isNaN(num1) || Number.isNaN(num2) === NaN) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200).json({ result: subtract(num2, num1) });
  }
});

app.post('/numbers/multiply', (req, res) => {
  const { a, b } = req.body;

  if (!a || !b) {
    res.status(400).send({ error: 'Parameters "a" and "b" are required.' });
  }
  if (Number.isNaN(Number(a)) || Number.isNaN(Number(b)) === NaN) {
    res.status(400).send({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else {
    res.status(200).send({ result: multiply(req.body.a, req.body.b) });
  }
});

app.post('/numbers/divide', (req, res) => {
  const { a, b } = req.body;

  if (a === 0) {
    return res.status(200).send({ result: 0 });
  }
  if (b === 0) {
    return res.status(400).send({ error: 'Unable to divide by 0.' });
  }
  if (!a || !b) {
    res.status(400).send({ error: 'Parameters "a" and "b" are required.' });
  }
  if (Number.isNaN(Number(a)) || Number.isNaN(Number(b)) === NaN) {
    res.status(400).send({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else {
    res.status(200).send({ result: divide(req.body.a, req.body.b) });
  }
});

app.post('/numbers/remainder', (req, res) => {
  const { a, b } = req.body;

  if (a === 0) {
    return res.status(200).send({ result: 0 });
  }
  if (b === 0) {
    return res.status(400).send({ error: 'Unable to divide by 0.' });
  }
  if (!a || !b) {
    res.status(400).send({ error: 'Parameters "a" and "b" are required.' });
  }
  if (Number.isNaN(Number(a)) || Number.isNaN(Number(b)) === NaN) {
    res.status(400).send({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200).send({ result: remainder(req.body.a, req.body.b) });
  }
});

// BOOLEANS

app.post('/booleans/negate', (req, res) => {
  const a = req.body.value;

  res.status(200).send({ result: negate(a) });
});

app.post('/booleans/truthiness', (req, res) => {
  const a = req.body.value;

  res.status(200).send({ result: truthiness(a) });
});

app.get('/booleans/is-odd/:a', (req, res) => {
  const a = parseFloat(req.params.a);

  if (Number.isNaN(Number(a))) {
    res.status(400).json({ error: 'Parameter must be a number.' });
  } else {
    res.status(200).json({ result: isOdd(a) });
  }
});

app.get('/booleans/:string/starts-with/:char', (req, res) => {
  const { string, char } = req.params;

  if (char.length > 1) {
    res.status(400).json({ error: 'Parameter "character" must be a single character.' });
  } else {
    res.status(200).json({ result: startsWith(char, string) });
  }
});

// ARRAYS

app.post('/arrays/element-at-index/:index', (req, res) => {
  const { index } = req.params;
  const { array } = req.body;

  res.status(200).send({ result: getNthElement(index, array) });
});

app.post('/arrays/to-string', (req, res) => {
  const { array } = req.body;

  res.status(200).send({ result: arrayToCSVString(array) });
});

app.post('/arrays/append', (req, res) => {
  const element = req.body.value;
  const { array } = req.body;

  res.status(200).send({ result: addToArray2(element, array) });
});

app.post('/arrays/starts-with-vowel', (req, res) => {
  const { array } = req.body;

  res.status(200).send({ result: elementsStartingWithAVowel(array) });
});

app.post('/arrays/remove-element', (req, res) => {
  const { index } = req.query;
  const { array } = req.body;

  if (index === undefined) {
    res.status(200).send({ result: removeNthElement2(0, array) });
  }
  res.status(200).send({ result: removeNthElement2(index, array) });
});

module.exports = app;
