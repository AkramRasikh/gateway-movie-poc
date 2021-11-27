const request = require("supertest");
const { app: mockApp } = require("../app");

beforeEach(() => {
  jest.clearAllMocks();
});

it("add payment should call payment service", async () => {
  await request(mockApp).post("/").expect(422);
  // expect payment api to be called with body ...
});

it("add payment should respond with error status", async () => {});
