const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const authorizemiddleware =(...allowedRoles) => {

    return (req, res, next) => {
     
     if (!allowedRoles.includes (req.Student.role)||!allowedRoles.includes(req.Teacher.role)) 
        return res.status(403).json({ message: 'Access denied' });
      next();
      }

    };
;
  module.exports = authorizemiddleware;