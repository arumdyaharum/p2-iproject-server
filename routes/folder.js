const router = require('express').Router()
const folderController = require('../controllers/folderController.js')

router.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = router