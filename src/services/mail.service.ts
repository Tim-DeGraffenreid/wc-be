/*
import nodemailer from 'nodemailer'
import AppError from '../utils/appError'

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
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
*/
export const sendConfirmationEmail = async (email: string, token: string) => {
  console.log("No email!");
}