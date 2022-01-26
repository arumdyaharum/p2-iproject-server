const { Tweet, Folder } = require('../models')

class Controller {
  static async postTweet(req, res, next) {
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
        const { page, size } = req.query
        const items = +size || 8 
        const toPage = +page || 1
        let value = {
          where: {folderId: folder.id}
        }

        const tweets = await Tweet.findAll(value)
        const totalPages = Math.ceil(tweets / items)

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
}

module.exports = Controller