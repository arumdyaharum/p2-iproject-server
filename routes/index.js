const router = require('express').Router()
const authController = require('../controllers/authController.js')
const folderRouter = require('./folder.js')
const tweetRouter = require('./tweet.js')

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.use('/folders', folderRouter)
router.use('/tweets', tweetRouter)

module.exports = router