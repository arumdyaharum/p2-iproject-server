const { Tweet, Folder } = require('../models')

class Controller {
  static async postTweets(req, res, next) {
    try {
      const id = req.params.id
      const folder = await Folder.findOne({where: {id}})
      if(folder) {
        const link = req.body.tweetId
        const separateLink = link.include("/") ? link.split("/").pop() : link
        const tweetId = separateLink.include("?") ? separateLink.split("?").shift() : separateLink
        const value = {
          description: req.body.description,
          theme: req.body.theme,
          tweetId,
          folderId: folder.id
        }
        const result = await Tweet.create(value)
        res.status(201).json({message: `Tweet with id ${result.id} created`})
      } else {
        throw({name: "notfound"})
      }
    } catch(err) {
      next(err)
    }
  }

  static async getTweets(req, res, next) {
    try {
      const id = req.params.id
      const folder = await Folder.findOne({where: {id}})
      if(folder) {
        const result = await Tweet.findAll({where: {folderId: folder.id}})
        res.status(200).json(result)
      } else {
        throw({name: "notfound"})
      }
    } catch(err) {
      next(err)
    }
  }

  static async putTweets(req, res, next) {
    try {
      const id = req.params.tweetId
      const link = req.body.tweetId
      const separateLink = link.include("/") ? link.split("/").pop() : link
      const tweetId = separateLink.include("?") ? separateLink.split("?").shift() : separateLink
      const value = {
        description: req.body.description,
        theme: req.body.theme,
        tweetId
      }
      await Tweet.update(value, {where: {id}})
      res.status(200).json({message: `Tweet with id ${id} updated`})
    } catch(err) {
      next(err)
    }
  }
}

module.exports = Controller