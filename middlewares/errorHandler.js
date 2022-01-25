const errorHandler = (err, req, res, next) => {
  console.log("=====>>>>>>" + err + "<<<<<<<======");
  switch(err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      const error = err.errors.map(el => el.message)
      res.status(400).json({message: error[0]})
      break;
    case "wronginput":
      res.status(401).json({ message: "Invalid email or password" })
      break;
    case "invalidKey":
      res.status(401).json({message: "Invalid key type"})
    default:
      res.status(500).json({message: "Internal server error"})
      break;
  }
}

module.exports = errorHandler