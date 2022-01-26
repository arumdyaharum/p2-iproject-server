const router = require('express').Router()
const tweetController = require('../controllers/tweetController.js')
const authentication = require('../middlewares/authentication.js')
const authorization = require("../middlewares/tweetAuthor.js")

router.post('/:id', authentication, tweetController.postTweets)
router.get('/:id', authentication, tweetController.getTweets)
router.put('/:tweetId', authentication, authorization, tweetController.putTweets)
router.delete('/:tweetId', authentication, authorization, tweetController.deleteTweets)

module.exports = router