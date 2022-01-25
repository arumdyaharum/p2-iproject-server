const router = require('express').Router()
const tweetController = require('../controllers/tweetController.js')

router.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = router