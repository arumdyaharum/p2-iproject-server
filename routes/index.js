const router = require('express').Router()
const authController = require('../controllers/authController.js')
const folderRouter = require('./folder.js')
const tweetRouter = require('./tweet.js')

router.post('/register', authController.postRegister)
router.post('/login', authController.postLogin)
router.get('/keys', authController.getKeys)

router.use('/folders', folderRouter)
router.use('/tweets', tweetRouter)

module.exports = router