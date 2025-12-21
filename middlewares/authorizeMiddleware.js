const Student = require('../models/Student');

const authorizemiddleware =(...allowedRoles) => {

    return (req, res, next) => {
     
     if (!allowedRoles.includes (req.Student.role)) 
        return res.status(403).json({ message: 'Access denied' });
      next();
      }

    };
;
  module.exports = authorizemiddleware;