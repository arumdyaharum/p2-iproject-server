const { User } = require('../models')
const { verifyToken } = require("../helpers/jwt.js")

const authentication = async(req, res, next) => {
  try {
    const access_token = req.headers.access_token
    if(access_token) {
      const payload = verifyToken(access_token)
      const user = await User.findOne({where: {id: payload.id}})
      if(user) {
        req.currentUser = {id: user.id}
        next()
      } else {
        throw({name: "unauth"})
      }
    } else {
      throw({name: "unauth"})
    }
  } catch(err) {
    next(err)
  }
}

module.exports = authentication