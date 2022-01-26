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
      const { page, size } = req.query
      const items = +size || 10 
      const toPage = +page || 1

      let value = {
        where: {userId: req.currentUser.id}
      }
      if(size) {
        value.limit = items
      }
      if(page) {
        value.offset = (toPage - 1) * items
      }
      const result = await Folder.findAll(value)
      res.status(200).json(result)
    } catch(err) {
      next(err)
    }
  }
}

module.exports = Controller