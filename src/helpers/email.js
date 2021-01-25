const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
});

exports.sendEmail = (email, text) => {
  return new Promise((resolve, reject) => {
    let message = {
      from: process.env.EMAIL_USERNAME, // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      html: `Please click this link <a href='${text}'>Verificaton Email</a>`, // html body
    }
    transporter.sendMail(message, (error, info) => {
      if (error) {
        reject(error)
      } else {
        resolve(info)
      }
    })
  })
}

exports.emailForgotPassword = (email, url) => {
  return new Promise((resolve, reject) => {
    let message = {
      from: process.env.EMAIL_USERNAME, // sender address
      to: email, // list of receivers
      subject: "Reset Password ✔", // Subject line
      html: `Please click this link for reset your password <a href='${url}'>Reset Password</a>`, // html body
    }
    transporter.sendMail(message, (error, info) => {
      if (error) {
        reject(error)
      } else {
        resolve(info)
      }
    })
  })
}