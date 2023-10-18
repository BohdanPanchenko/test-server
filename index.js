const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

const data = [];

app.get("/", (req, res) => {
  fs.writeFile("hello.txt", "У вас новый посетитель!");
  res.json("200");
});

app.post("/", (res, req) => {
  fs.writeFile("hello.txt", "У вас новый посетитель!");
});

app.listen(port, () => {
  console.log("Server starting...");
});
module.exports = app;
module.exports = fs;
