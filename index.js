const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 3000;
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

const data = {};
const emailConfig = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};
const transporter = nodemailer.createTransport(emailConfig);
const recipientEmail = "logitechchillstream@gmail.com";

// app.get("/", async (req, res) => {
//   try {
//     const mailOptions = {
//       from: emailConfig.auth.user,
//       to: recipientEmail,
//       subject: "Новый посетитель!",
//       text: `У вас новый посетитель! ${getDate()} ip-address ${req.ip} \n`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.sendStatus(200);
//   } catch (err) {
//     console.log(err);
//     res.send(err);
//   }
// });
app.post("/", (req, res) => {
  try {
    data = req.body;
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
app.listen(port, () => {
  console.log("Server starting...");
});
async function sendMessage(data) {
  const mailOptions = {
    from: emailConfig.auth.user,
    to: recipientEmail,
    subject: "Новый посетитель!",
    text: `У вас новый посетитель! ${getDate()} ip-address ${data.city} \n`,
  };

  await transporter.sendMail(mailOptions);
}
function getDate() {
  const date = new Date();
  const hours = date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`;

  return `${hours}:${minutes}:${seconds}`;
}
sendMessage(data);
module.exports = app;
