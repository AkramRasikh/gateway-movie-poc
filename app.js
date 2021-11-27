require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", async function (_, res) {
  try {
    res.status(200).send("");
  } catch (error) {
    res.status(400).send("err");
  }
});

const port =
  process.env.NODE_ENV === "test" ? process.env.HOST_TEST : process.env.HOST;
app.listen(port);

console.log("running on port ", port);

module.exports = {
  app,
};
