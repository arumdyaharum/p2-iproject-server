const router = require('express').Router()
const folderController = require('../controllers/folderController.js')
const authentication = require('../middlewares/authentication.js')
const authorization = require('../middlewares/folderAuthor.js')

router.post('/', authentication, folderController.postFolders)
router.get('/', authentication, folderController.getFolders)
router.get('/:id', authentication, folderController.getFolderById)
router.put('/:id', authentication, authorization, folderController.putFolders)
router.delete('/:id', authentication, authorization, folderController.deleteFolders)

module.exports = router