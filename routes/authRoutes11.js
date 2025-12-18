/*const express = require('express');
const bcrypt = require('argon2');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const router = express.Router();

// تسجيل الدخول
router.post('/register', async (req, res) => {
  const { name,gender,phone_number,class_level, email, password, role } = req.body;

  const hashed = await bcrypt.hash(password);
  
  const student = await Student.create({ name,gender,phone_number,class_level, email, password: hashed, role });

  res.json({ message: 'Student registered' });
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }

    // التحقق من كلمة السر
    const isMatch = await bcrypt.verify(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // توليد التوكن
    const token = jwt.sign({ studentId: student._id,role: student.role }, 
        process.env.JWT_SECRET,
         { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;*/