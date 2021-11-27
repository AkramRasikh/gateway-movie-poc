const request = require('supertest');
const { default: axios } = require('axios');
const { app: mockApp } = require('../app');

jest.mock('axios');

beforeEach(() => {
  jest.clearAllMocks();
});

const mockRes = [
  {
    id: 1,
    title: 'Titanic',
  },
  {
    id: 2,
    title: 'Love actually',
  },
  {
    id: 3,
    title: 'Friday',
  },
  {
    id: 4,
    title: 'Parasite',
  },
];

it('get /movies should return movies & 200', async () => {
  axios.get.mockImplementation(() => ({ data: mockRes }));
  const response = await request(mockApp).get('/movies');
  expect(response.body).toEqual(mockRes);
  expect(response.status).toEqual(200);
});

it('get /movies should return error', async () => {
  axios.get.mockImplementation(() => Promise.reject());
  const response = await request(mockApp).get('/movies');
  expect(response.status).toEqual(400);
});

it('post /payment should return 200 with message', async () => {
  const paymentSuccessMsg = 'payment sent';
  axios.post.mockImplementation(() => ({ data: paymentSuccessMsg }));
  const response = await request(mockApp)
    .post('/payment')
    .send({ amount: 1234 });

  expect(response.status).toEqual(200);
  expect(response.text).toEqual(paymentSuccessMsg);
});

it('post /payment should return 404 with message', async () => {
  axios.post.mockImplementation(() =>
    Promise.reject({ response: { status: 404 } })
  );
  const response = await request(mockApp)
    .post('/payment')
    .send({ error: true });

  expect(response.status).toEqual(404);
  expect(response.text).toEqual('error sending payment');
});

it('post /payment should return custom error from payment service', async () => {
  const errResponse = { status: 422, data: 'validation failed!' };
  axios.post.mockImplementation(() =>
    Promise.reject({ response: errResponse })
  );
  const response = await request(mockApp)
    .post('/payment')
    .send({ noBody: true });

  expect(response.status).toEqual(errResponse.status);
  expect(response.text).toEqual(errResponse.data);
});
