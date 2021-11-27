require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const { default: axios } = require('axios');

app.use(bodyParser.json());

app.get('/movies', async (_, res) => {
  try {
    const { data } = await axios.get(process.env.MOVIE_URL);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send('err sending movies');
  }
});

const port =
  process.env.NODE_ENV === 'test' ? process.env.HOST_TEST : process.env.HOST;

app.listen(port);

console.log('running on port ', port);

module.exports = {
  app,
};
