// make a require admin
// check the boolean user table isAdmin

const user = require('../db')

function requireUser(req, res, next) {
    if (!req.user) {
        next({
            name: "MissingUserError",
            message: "You must be logged in to perform this action"
        });
    }
    next();
}

function requireAdmin(req, res, next) {
    if (user.admin !== true) {
      next({
        name: "UserNotAndminError",
        message: "You must be an admin to perform this action"
      });
    }
  
    next();
  }

module.exports = {
    requireUser, requireAdmin
}
