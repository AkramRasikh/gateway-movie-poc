const request = require('supertest');
const { app: mockApp } = require('../app');
const { default: axios } = require('axios');
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
