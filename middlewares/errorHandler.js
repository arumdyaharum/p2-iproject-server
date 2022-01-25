const errorHandler = (err, req, res, next) => {
  console.log("=====>>>>>>" + err + "<<<<<<<======");
  switch(err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      const error = err.errors.map(el => el.message)
      res.status(400).json({message: error[0]})
      break;
    default:
      res.status(500).json({message: "Internal server error"})
      break;
  }
}

module.exports = errorHandler