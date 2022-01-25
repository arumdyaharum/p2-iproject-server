const router = require('express').Router()
const tweetController = require('../controllers/tweetController.js')
const authentication = require('../middlewares/authentication.js')

router.post('/:id', authentication, tweetController.postTweets)

module.exports = router