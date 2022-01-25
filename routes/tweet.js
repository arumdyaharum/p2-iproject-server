const router = require('express').Router()
const tweetController = require('../controllers/tweetController.js')
const authentication = require('../middlewares/authentication.js')
const authorization = require("../middlewares/tweetAuthor.js")

router.post('/:id', authentication, tweetController.postTweets)
router.get('/:id', authentication, tweetController.getTweets)
router.put('/:tweetId', authentication, authorization, tweetController.putTweets)

module.exports = router