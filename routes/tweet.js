const router = require('express').Router()
const tweetController = require('../controllers/tweetController.js')
const authentication = require('../middlewares/authentication.js')

router.post('/:id', authentication, tweetController.postTweets)
router.get('/:id', authentication, tweetController.getTweets)

module.exports = router