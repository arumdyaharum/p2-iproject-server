const router = require('express').Router()
const authController = require('../controllers/authController.js')
const folderRouter = require('./folder.js')
const tweetRouter = require('./tweet.js')
const authentication = require('../middlewares/authentication.js')

router.post('/register', authController.postRegister)
router.post('/login', authController.postLogin)
router.get('/users', authentication, authController.getUsers)

router.use('/folders', folderRouter)
router.use('/tweets', tweetRouter)

module.exports = router