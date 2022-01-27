const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs.js')
const { signToken } = require('../helpers/jwt.js')
const axios = require('axios')
const nodemailer = require('nodemailer');

class Controller {
  static async postRegister(req, res, next) {
    try {
      const value = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      }
      const result = await User.create(value)
      res.status(201).json({
        id: result.id,
        email: result.email
      })
    } catch(err) {
      next(err)
    }
  }

  static async getEmail(req, res, next) {
    try {
      const email = req.query.email
      const checkEmail = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_KEY}&email=${email}`)
      if(checkEmail.data.deliverability === 'DELIVERABLE') {
        res.status(200).json({status: "safe"})
      } else if(checkEmail.data.deliverability === 'UNDELIVERABLE') {
        res.status(200).json({status: "danger"})
      } else {
        if(+checkEmail.data.quality_score > 0.5 ) {
          res.status(200).json({status: "safe"})
        } else {
          res.status(200).json({status: "warning"})
        }
      }
    } catch(err) {
      next(err)
    }
  }

  static async postOTP(req, res, next) {
    try {
      const { email } = req.body
      let password = await axios.get(`https://api.happi.dev/v1/generate-password?apikey=${process.env.HAPPI_KEY}&limit=1&length=8&num=1&upper=1&symbols=0`)
      password = password.data.passwords[0]

      let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'tweetfiling@gmail.com',
          pass: process.env.EMAIL_PASS
        }
      });
        
      let mailDetails = {
        from: 'Tweet Filing <tweetfiling@gmail.com>',
        to: email,
        subject: 'Konfirmasi Pendaftaran Tweet Filing',
        html: `
        <p>Berikut adalah kode OTP untuk melanjutkan proses pendaftaran.</p>
        <h3>Kode OTP : ${password}<h3>
        `
      };
        
      mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
          console.log(err)
          res.status(502).json({message: "Failed sent email!"})
        } else {
          res.status(201).json({password})
        }
      });
    } catch(err) {
      next(err)
    }
  }

  static async postLogin(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({where: {email}})
      if(user) {
        const checkPassword = comparePassword(password, user.password)
        if(checkPassword) {
          const payload = { id: user.id }
          const access_token = signToken(payload)
          res.status(200).json({access_token})
        } else {
          throw({name: "wronginput"})
        }
      } else {
        throw({name: "wronginput"})
      }
    } catch(err) {
      next(err)
    }
  }

  static async getUsers(req, res, next) {
    try {
      const user = await User.findOne({where: {id: req.currentUser.id}})
      res.status(200).json(user)
    } catch(err) {
      next(err)
    }
  }

  static async getUsersById(req, res, next) {
    try {
      const user = await User.findOne({where: {email: req.params.email}})
      res.status(200).json(user)
    } catch(err) {
      next(err)
    }
  }
}

module.exports = Controller