const user = require('../models/user')

function Authenticate(req, res, next) {

  let token = req.get("Authorization")
  if (!token) {
    res.status(401).json({
      message: "You are not authorized to view this information."
    })
  } else {
    user.verifyToken(token, function (success, response) {
      if (success) {
        res.locals.userId = response.id;
        next()
      } else {
        res.status(401).json(response)
      }
    })
  }
}

module.exports = Authenticate