const user = require("../../db/users");

function requireAdmin(req, res, next) {
    if (user.Admin !== true) {
      next({
        name: "User is not Admin",
        message: "You must be an Admin to perform this action"
      });
    }
  
    next();
  }
  
  module.exports = {
    requireAdmin
  }