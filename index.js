const express = require("express");
const app = express();
const port = 3000;

app.get("/items", (req, res) => {
  res.send("Hi, there!");
});
app.get("/", (req, res) => {
  res.send("<h3>Hello, suckers!</h3>");
});
app.post("/", (req, res) => {
  console.log(req.body);
});
app.listen(port, () => {
  console.log("Server starting...");
});
