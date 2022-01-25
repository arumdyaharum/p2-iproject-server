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
}

module.exports = Controller