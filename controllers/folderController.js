const { Folder, Tweet } = require("../models")

class Controller {
  static async postFolders(req, res, next) {
    try {
      const value = {
        name: req.body.name,
        userId: req.currentUser.id
      }
      const result = await Folder.create(value)
      res.status(201).json({message: `Folder with id ${result.id} created`})
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

  static async getFolderById(req, res, next) {
    try {
      const id = req.params.id
      const result = await Folder.findOne({where: {id}})
      res.status(200).json(result)
    } catch(err) {
      next(err)
    }
  }

  static async putFolders(req, res, next) {
    try {
      const value = { name: req.body.name }
      const id = req.params.id
      await Folder.update(value, {where: {id}})
      res.status(200).json({message: `Folder with id ${id} Updated`})
    } catch(err) {
      next(err)
    }
  }

  static async deleteFolders(req, res, next) {
    try {
      const id = req.params.id
      await Folder.destroy({where: {id}})
      res.status(200).json({message: `Folder with id ${id} deleted`})
    } catch(err) {
      next(err)
    }
  }
}

module.exports = Controller