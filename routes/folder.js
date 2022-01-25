const router = require('express').Router()
const folderController = require('../controllers/folderController.js')
const authentication = require('../middlewares/authentication.js')
const authorization = require('../middlewares/folderAuthor.js')

router.post('/', authentication, folderController.postFolders)
router.get('/', authentication, folderController.getFolders)
router.put('/:id', authentication, authorization, folderController.putFolders)

module.exports = router