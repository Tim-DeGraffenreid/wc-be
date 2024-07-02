"use strict";
<<<<<<< HEAD
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConfirmationEmail = void 0;
=======
>>>>>>> origin/master
/*
import nodemailer from 'nodemailer'
import AppError from '../utils/appError'

let transporter = nodemailer.createTransport({
<<<<<<< HEAD
  host: process.env.EMAIL_HOST,
=======
  host: process.env.EMAIL_HOST ,
>>>>>>> origin/master
  secure: false,
  port: process.env.EMAIL_PORT,
  logger: true,
  debug: true,
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD,
  },
  from: process.env.DEFAULT_FROM_EMAIL,
})

export const sendConfirmationEmail = async (email: string, token: string) => {
  const url = `${
    process.env.FRONTEND_URL ? process.env.FRONTEND_URL : 'http://localhost:3000'
  }/confirm-email/${token}`
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Registration Confirmation</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
    
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
    
        .logo {
          width: 100px;
          height: auto;
        }
    
        .content {
          text-align: left;
        }
    
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #4CAF50;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Registration Confirmation</h2>
        </div>
    
        <div class="content">
          <p>Dear User,</p>
          <p>Thank you for signing up on WeCode! To complete your registration, please click the button below(link expires in 48hours):</p>
    
          <a href="${url}" class="button">Complete Registration</a>
    
          <p>If you didn't request this registration, please ignore this email.</p>
    
          <p>Best regards,<br>WeCode</p>
        </div>
      </div>
    </body>
    </html>
      `
  const mailOptions = {
    from: process.env.DEFAULT_FROM_EMAIL,
    to: email,
    subject: 'Confirm your email address',
    html,
  }

  console.log('before sending mail')

  await transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log('email sent')
      console.log(info)
    })
    .catch((err) => {
      console.log(err.message)
      console.log(err)
      throw new AppError(500, err.message)
    })
}
<<<<<<< HEAD
*/
const sendConfirmationEmail = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("No email!");
=======
    */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConfirmationEmail = void 0;
const sendConfirmationEmail = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Nothing");
>>>>>>> origin/master
});
exports.sendConfirmationEmail = sendConfirmationEmail;
//# sourceMappingURL=mail.service.js.map