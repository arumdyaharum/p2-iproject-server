const router = require('express').Router()
const folderController = require('../controllers/folderController.js')
const authentication = require('../middlewares/authentication.js')

router.post('/', authentication, folderController.postFolders)
router.get('/', authentication, folderController.getFolders)

module.exports = router