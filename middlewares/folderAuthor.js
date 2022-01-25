const { Folder } = require("../models")

const authorization = async(req, res, next) => {
  try {
    const id = req.params.id
    const folder = await Folder.findOne({where: {id}})
    if(folder.userId === req.currentUser.id) {
      next()
    } else {
      throw({name: "forbidden"})
    }
  } catch(err) {
    next(err)
  }
}

module.exports = authorization