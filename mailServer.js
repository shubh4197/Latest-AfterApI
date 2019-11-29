const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});
app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Mail<br><br></h1>"
  );
});
app.post("/sendmail", (req, res) => {
  console.log("sending mail");
  let user = req.body;
  sendMail(user, info => {
    res.send(info);
  });
});
async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "sourcingthecrowd@gmail.com",
      pass: "Source2crowd."
    }
  });
  let mailOptions = {
    from: 'sourcingthecrowd@gmail.com', // sender address
    to: user.email, // list of receivers
    subject: user.subject, // Subject line
    html: user.Message
  };
  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);
  callback(info);
}
