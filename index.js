const express = require("express");
const nodemailer = require("nodemailer");
// const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 3000;

// const data = [];

const emailConfig = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};
const transporter = nodemailer.createTransport(emailConfig);
const recipientEmail = "logitechchillstream@gmail.com";

app.get("/", (req, res) => {
  // const note = `У вас новый посетитель! ${getDate()} ip-address ${req.ip} \n`;
  // data.push(note);
  // data.forEach((el) => {
  //   fs.appendFile("hello.txt", el, () => {});
  // });

  try {
    const mailOptions = {
      from: emailConfig.auth.user,
      to: recipientEmail,
      subject: "Новый посетитель!",
      text: `У вас новый посетитель! ${getDate()} ip-address ${req.ip} \n`,
    };

    transporter.sendMail(mailOptions);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log("Server starting...");
});

function getDate() {
  const date = new Date();
  const hours = date.getDay();
  const minutes = date.getDay() < 10 ? `0${date.getDay()}` : `${date.getDay()}`;
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`;

  return `${hours}:${minutes}:${seconds}`;
}
// request.socket.remoteAddress
module.exports = app;
