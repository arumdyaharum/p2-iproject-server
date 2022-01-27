const { Folder, Tweet } = require("../models")

const authorization = async(req, res, next) => {
  try {
    const id = req.params.tweetId
    const tweet = await Tweet.findOne({where: {id}})
    if(tweet) {
      const folder = await Folder.findOne({where: {id: tweet.folderId}})
      if(folder.userId === req.currentUser.id) {
        next()
      } else {
        throw({name: "forbidden"})
      }
    } else {
      throw({name: "notfound"})
    }
  } catch(err) {
    next(err)
  }
}

module.exports = authorization