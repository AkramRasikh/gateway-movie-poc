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

app.post('/payment', async (req, res) => {
  try {
    const response = await axios.post(`${process.env.PAYMENT_URL}`, req.body);
    const responseText = response.data;
    res.status(200).send(responseText);
  } catch (err) {
    const { status, data } = err.response;
    if (status === 404) {
      res.status(status).send('error sending payment');
    }
    res.status(status).send(data);
  }
});

const port =
  process.env.NODE_ENV === 'test' ? process.env.HOST_TEST : process.env.HOST;

app.listen(port);

console.log('running on port ', port);

module.exports = {
  app,
};
