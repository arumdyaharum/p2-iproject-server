const { User } = require('../models')

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
}

module.exports = Controller