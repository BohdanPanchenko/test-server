const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 3000;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);
app.use(cors());

const ipToIgnore = "37.115.239.24";
const emailConfig = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};
const transporter = nodemailer.createTransport(emailConfig);
const recipientEmail = "logitechchillstream@gmail.com";

app.get("/", async (req, res) => {
  try {
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
app.post("/", async (req, res) => {
  try {
    const mailOptions = {
      from: emailConfig.auth.user,
      to: recipientEmail,
      subject: "Новый посетитель!",
      text: `У вас новый посетитель!\n ${getDate()}\n ip-address: ${
        req.body.ip
      } \n region: ${req.body.region}\n city: ${req.body.city}`,
    };

    if (req.body.ip !== ipToIgnore) await transporter.sendMail(mailOptions);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
app.listen(port, () => {
  console.log("Server starting...");
});
function getDate() {
  const date = new Date();
  const hours = date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`;

  return `${hours}:${minutes}:${seconds}`;
}
module.exports = app;
