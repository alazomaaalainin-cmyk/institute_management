const jwt = require('jsonwebtoken');
const Student = require('../models/Student'); 
const Teacher = require('../models/Teacher'); 
 
const authMiddleware = async (req, res, next) => {
  
  const token = req.headers["authorization"]?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  else if(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRETS);
   const student = await Student.findById(decoded.studentId);  // أو أي نوع آخر من المستخدمين حسب المشروع
   if (!student) {
      return res.status(404).json({ message: 'User not found' });
    }
  // تخزين معلومات الطالب في الطلب
 req.student = decoded; // يحتوي على id و role
 next();
  } 
  else if(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRETT);
   const teacher = await Teacher.findById(decoded.teacherId);  // أو أي نوع آخر من المستخدمين حسب المشروع
   if (!teacher) {
      return res.status(404).json({ message: 'User not found' });
    }  

 req.Teacher = decoded; // يحتوي على id و role
    next();
  }
   else (err) 
    res.status(400).json({ message: 'Invalid Token' });
  
};

module.exports = authMiddleware;