const { Folder, Tweet } = require("../models")

class Controller {
  static async postFolders(req, res, next) {
    try {
      const value = {
        name: req.body.name,
        userId: req.currentUser.id
      }
      const result = await Folder.create(value)
      res.status(201).json({
        id: result.id,
        name: result.name
      })
    } catch(err) {
      next(err)
    }
  }
  
  static async getFolders(req, res, next) {
    try {
      const result = await Folder.findAll({
        where: {userId: req.currentUser.id},
        include: [
          {model: Tweet}
        ]
      })
      result.map(val => {
        val.Tweet = val.Tweet.length
        return val
      })
      res.status(200).json(result)
    } catch(err) {
      next(err)
    }
  }
}

module.exports = Controller