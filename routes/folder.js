const router = require('express').Router()
const folderController = require('../controllers/folderController.js')
const authentication = require('../middlewares/authentication.js')

router.get('/', authentication, folderController.postFolders)

module.exports = router