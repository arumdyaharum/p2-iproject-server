const { Folder } = require("../models")

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
}

module.exports = Controller