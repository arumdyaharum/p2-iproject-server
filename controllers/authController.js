const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs.js')
const { signToken } = require('../helpers/jwt.js')

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

  static async getKeys(req, res, next) {
    try {
      const type = req.query.for
      const HAPPI_KEY = process.env.HAPPI_KEY
      const ABSTRACT_KEY = process.env.ABSTRACT_KEY
      const key = type === "happi" ? HAPPI_KEY : type === "abstract" ? ABSTRACT_KEY : ''
      if(key) {
        res.status(200).json({key})
      } else {
        throw({name: "invalidKey"})
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
}

module.exports = Controller