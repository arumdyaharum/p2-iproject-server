const { Tweet, Folder } = require('../models')

class Controller {
  static async postTweets(req, res, next) {
    try {
      const id = req.params.id
      const folder = await Folder.findOne({where: {id}})
      if(folder) {
        const link = req.body.tweetId
        const separateLink = link.includes("/") ? link.split("/").pop() : link
        const tweetId = separateLink.includes("?") ? separateLink.split("?").shift() : separateLink
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
        const { page, size } = req.query
        const items = +size || 8 
        const toPage = +page || 1
        let value = {
          where: {folderId: folder.id}
        }

        const tweets = await Tweet.findAll(value)
        const totalPages = Math.ceil(tweets.length / items) || 1

        if(size) {
          value.limit = items
        }
        if(page) {
          value.offset = (toPage - 1) * items
        }
        const result = await Tweet.findAll(value)
        res.status(200).json({totalPages, data: result})
      } else {
        throw({name: "notfound"})
      }
    } catch(err) {
      next(err)
    }
  }

  static async getTweetById(req, res, next) {
    try {
      const id = req.params.id
      const result = await Tweet.findOne({where: {id}})
      if(result) {
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
      const separateLink = link.includes("/") ? link.split("/").pop() : link
      const tweetId = separateLink.includes("?") ? separateLink.split("?").shift() : separateLink
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

  static async deleteTweets(req, res, next) {
    try {
      const id = req.params.tweetId
      await Tweet.destroy({where: {id}})
      res.status(200).json({message: `Tweet with id ${id} deleted`})
    } catch(err) {
      next(err)
    }
  }
}

module.exports = Controller